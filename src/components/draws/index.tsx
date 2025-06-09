import routes from "@/core/config/routes";
import Auth from "@/core/middleware/auth";
import DrawsService from "@/services/draws/draws-service";
import Input from "@/shared/components/input";
import ArchiveDrawsDialog from "./archive-draws-dialog";
import Checkbox from "@/shared/components/checkbox";
import ModuleTemplate from "@/shared/components/module-template";
import CustomDialog from "@/shared/components/custom-dialog";
import IconButton from "@/shared/components/icon-button";
import DrawItem from "./draw-item";
import DeleteDrawsDialog from "./delete-draws-dialog";
import CreateDrawDialog from "./create-draw-dialog";
import FilterDrawsDialog from "./filter-draws-dialog";
import UpdateDrawDialog from "./update-draw-dialog";
import { useEffect, useState } from "react";
import { IoAdd, IoArchive, IoCheckboxOutline, IoFilter, IoSearch, IoTrash } from "react-icons/io5";
import { useMessageProvider } from "@/providers/message/message-provider";
import { useLoaderProvider } from "@/providers/loader/loader-provider";
import { Execution, UserDto } from "@/models";
import { DrawDao, DrawDto, DrawFilter } from "@/models";

const drawsService: DrawsService = new DrawsService();
const auth: Auth = new Auth();

let user: UserDto = {};
let drawDao: DrawDao = {};
let drawsDao: DrawDao[] = [];
let selectedDrawDto: DrawDto;
let selectedDrawsDto: DrawDto[] = [];
let drawFilter: DrawFilter = { active: true };

const Draws: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();
    const { setMessage } = useMessageProvider();

    const [isInSelectableMode, setIsInSelectableMode] = useState<boolean>(false);
    const [showingCheckboxes, setShowingCheckboxes] = useState<boolean>(false);
    const [isCreateDrawDialogOpen, setIsCreateDrawDialogOpen] = useState<boolean>(false);
    const [isUpdateDrawDialogOpen, setIsUpdateDrawDialogOpen] = useState<boolean>(false);
    const [isDuplicateDrawDialogOpen, setIsDuplicateDrawDialogOpen] = useState<boolean>(false);
    const [isArchiveDrawsDialogOpen, setIsArchiveDrawsDialogOpen] = useState<boolean>(false);
    const [isDeleteDrawsDialogOpen, setIsDeleteDrawsDialogOpen] = useState<boolean>(false);
    const [isFilterDrawsDialogOpen, setIsFilterDrawsDialogOpen] = useState<boolean>(false);
    const [draws, setDraws] = useState<DrawDto[]>([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowingCheckboxes(isInSelectableMode);
        }, 300);
    }, [isInSelectableMode])

    //#region API
    const getData = async (): Promise<void> => {
        setIsLoading(true);

        getUser();
        await getDraws();

        setIsLoading(false);
    }

    const getUser = (): void => {
        const userAux: UserDto | undefined = auth.getUser();

        if (userAux === undefined) {
            return auth.clearSession();
        }

        user = userAux;
    }

    const getDraws = async(): Promise<void> => {
        
        const filter: DrawFilter = { ...drawFilter, userId: user.userId };
        const draws: DrawDto[] = await drawsService.getDraws(filter);

        setDraws(draws);
    }

    const createDraw = async(_drawDao?: DrawDao, executeGetData?: boolean): Promise<void> => {
        _drawDao = _drawDao ?? drawDao;

        setIsLoading(true);

        const execution: Execution = await drawsService.createDraw(_drawDao);

        setIsCreateDrawDialogOpen(false);
        setIsDuplicateDrawDialogOpen(false);

        drawDao = {};

        if (execution.successful === true) {

            if (executeGetData !== false) await getData();

            setMessage({
                type: 'success',
                title: 'Exitoso',
                message: execution.message
            });
        } else {
            setMessage({
                type: 'error',
                title: 'Error',
                message: execution.message
            });
        }

        setIsLoading(false);
    }

    const updateDraw = async(_drawDao?: DrawDao, executeGetData?: boolean): Promise<void> => {
        _drawDao = _drawDao ?? drawDao;

        console.log(_drawDao);

        setIsLoading(true);
        
        const execution: Execution = await drawsService.updateDraw(_drawDao);

        setIsUpdateDrawDialogOpen(false);

        drawDao = {};

        if (execution.successful === true) {

            if (executeGetData !== false) await getData();

            setMessage({
                type: 'success',
                title: 'Exitoso',
                message: execution.message
            });
        } else {
            setMessage({
                type: 'error',
                title: 'Error',
                message: execution.message
            });
        }

        setIsLoading(false);
    }

    const deleteDraw = async(filter: DrawFilter, executeGetData?: boolean): Promise<void> => {

        setIsLoading(true);
        
        const execution: Execution = await drawsService.deleteDraw(filter);

        setIsUpdateDrawDialogOpen(false);

        if (execution.successful === true) {

            if (executeGetData !== false) await getData();

            setMessage({
                type: 'success',
                title: 'Exitoso',
                message: execution.message
            });
        } else {
            setMessage({
                type: 'error',
                title: 'Error',
                message: execution.message
            });
        }

        setIsLoading(false);
    }

    const archiveDraws = async() => {
        await Promise.all(
            drawsDao.map(drawDao => updateDraw(drawDao, false))
        );
        drawsDao = [];
        selectedDrawsDto = [];
        setIsInSelectableMode(false);
        setIsArchiveDrawsDialogOpen(false);
        await getData();
    }

    const deleteDraws = async() => {
        await Promise.all(
            drawsDao.map(drawDao => deleteDraw({ drawId: drawDao.drawId }, false))
        );
        drawsDao = [];
        selectedDrawsDto = [];
        setIsInSelectableMode(false);
        setIsDeleteDrawsDialogOpen(false);
        await getData();
    }

    const filterDraws = async() => {
        setIsFilterDrawsDialogOpen(false);
        await getDraws();
    }
    //#endregion

    //#region Open Dialogs
    const openCreateDrawDialog = () => {
        setIsCreateDrawDialogOpen(true);
    }

    const openUpdateDrawDialog = (draw: DrawDto) => {
        selectedDrawDto = { ...draw };
        setIsUpdateDrawDialogOpen(true);
    }

    const openDuplicateDrawDialog = (draw: DrawDto) => {
        selectedDrawDto = { ...draw };
        setIsDuplicateDrawDialogOpen(true);
    }

    const openArchiveDrawDialog = (draw?: DrawDto) => {
        if (draw !== undefined) selectedDrawsDto = [ draw ];
        setIsArchiveDrawsDialogOpen(true);
    }

    const openDeleteDrawDialog = (draw?: DrawDto) => {
        if (draw !== undefined) selectedDrawsDto = [ draw ];
        setIsDeleteDrawsDialogOpen(true);
    }
    
    const openFilterDrawsDialog = () => {
        setIsFilterDrawsDialogOpen(true);
    }

    //#endregion

    const handleTitleFilter = (value: string) => {
        drawFilter = {...drawFilter, title: value};
    }

    const toggleIsInSelectableMode = () => {
        selectedDrawsDto = [];
        drawsDao = [];
        setIsInSelectableMode(prevValue => !prevValue);
    }

    const onChangeSelectCheckbox = (event: React.ChangeEvent<HTMLInputElement>, draw: DrawDto) => {
        if (selectedDrawsDto.some((drawDto: DrawDto) => drawDto.drawId === draw.drawId) === true) {
            const _selectedDrawDto: DrawDto[] = selectedDrawsDto.filter((drawDto: DrawDto) => drawDto.drawId !== draw.drawId);
            selectedDrawsDto = [ ..._selectedDrawDto ];
        } else {
            selectedDrawsDto.push({ ...draw });
        }
    }

    const clearFilter = async() => {
        drawFilter = { active: true, userId: user.userId };
        setIsFilterDrawsDialogOpen(false);
        await getDraws();
    }

    return (
        <ModuleTemplate 
            openCreateDialog={openCreateDrawDialog}
            route={routes[2]}
            actions={[
                <IconButton
                    icon={<IoCheckboxOutline size={30} color="white"/>}
                    className="bg-[var(--secondary)] hover:bg-green-400 shadow"
                    onClick={toggleIsInSelectableMode}
                />,
                <IconButton
                    icon={<IoFilter size={30} color="white"/>}
                    className="bg-[var(--secondary)] hover:bg-green-400 shadow"
                    onClick={openFilterDrawsDialog}
                />,
                <IconButton
                    icon={<IoAdd size={30} color="white"/>}
                    className="bg-[var(--secondary)] hover:bg-green-400 shadow"
                    onClick={openCreateDrawDialog}
                />
            ]}
        >
            <div className="w-full flex flex-row justify-between mb-3">
                <div className="w-[40%]">
                    <Input
                        id={'search-form'}
                        className="bg-gray-100"
                        containerClassName="w-[100%]"
                        setValue={handleTitleFilter}
                        type="text"
                        placeholder="Buscar"
                        iconButton={
                            <IconButton
                                id={'search-form'}
                                onClick={getDraws}
                                icon={<IoSearch size={20} color="gray"/>}
                            />
                        }
                        disabled={isInSelectableMode}
                    />
                </div>
                <div 
                    className={`relative flex flex-row justify-between w-min space-x-2 mb-2
                        transform transition-all duration-300 ease-in-out
                        ${isInSelectableMode === true ? 'translate-y-0 opacity-100' : 'translate-y-[-150%] opacity-0'}
                    `}
                >
                    <IconButton
                        className="bg-yellow-200 shadow"
                        icon={<IoArchive size={20} color="white"/>}
                        title="Archivar"
                        onClick={() => isInSelectableMode === true ? openArchiveDrawDialog() : {}}
                    />
                    <IconButton
                        className="bg-red-400 shadow"
                        icon={<IoTrash size={20} color="white"/>}
                        title="Eliminar"
                        onClick={() => isInSelectableMode === true ? openDeleteDrawDialog() : {}}
                    />
                </div>
            </div>

            {draws.map(
                (draw: DrawDto, index: number) => (
                    <div 
                        key={index} 
                        className="relative flex flex-row justify-center w-full items-center"
                    >
                        {showingCheckboxes === true &&
                            <Checkbox
                                containerClassName="mb-3 mr-3"
                                className={`
                                    hover:accent-green-300
                                    transform transition-all duration-300 ease-in-out
                                    ${isInSelectableMode === true ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                                `}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSelectCheckbox(event, draw)}
                            />
                        }
                        <DrawItem 
                            openUpdateDialog={openUpdateDrawDialog} 
                            openDuplicateDialog={openDuplicateDrawDialog}
                            openArchiveDialog={openArchiveDrawDialog}
                            openDeleteDialog={openDeleteDrawDialog}
                            disabled={isInSelectableMode}
                            {...draw} 
                        />
                    </div>
                )
            )}

            <CustomDialog
                    isOpen={isCreateDrawDialogOpen}
                    setIsOpen={setIsCreateDrawDialogOpen}
                    title="Crear Pendiente"
                >
                <CreateDrawDialog 
                    createDraw={createDraw} 
                    drawDao={drawDao}
                /> 
            </CustomDialog>
            
            <CustomDialog
                isOpen={isUpdateDrawDialogOpen}
                setIsOpen={setIsUpdateDrawDialogOpen}
                title="Editar Pendiente"
            >
                <UpdateDrawDialog
                    updateDraw={updateDraw} 
                    drawDao={drawDao}
                    drawDto={selectedDrawDto}
                /> 
            </CustomDialog>

            <CustomDialog
                    isOpen={isDuplicateDrawDialogOpen}
                    setIsOpen={setIsDuplicateDrawDialogOpen}
                    title="Crear Pendiente"
                >
                <CreateDrawDialog
                    createDraw={createDraw} 
                    drawDao={drawDao}
                    drawDto={selectedDrawDto}
                /> 
            </CustomDialog>

            <CustomDialog
                setIsOpen={setIsArchiveDrawsDialogOpen}
                isOpen={isArchiveDrawsDialogOpen}
                title={selectedDrawsDto.length === 1 ? 'Archivar Pendiente' : 'Archivar Pendientes'}
            >
                <ArchiveDrawsDialog
                    drawsDao={drawsDao}
                    drawsDto={selectedDrawsDto}
                    archiveDraw={archiveDraws}
                />
            </CustomDialog>

            <CustomDialog
                setIsOpen={setIsDeleteDrawsDialogOpen}
                isOpen={isDeleteDrawsDialogOpen}
                title={selectedDrawsDto.length === 1 ? 'Eliminar Pendiente' : 'Eliminar Pendientes'}
            >
                <DeleteDrawsDialog
                    drawsDao={drawsDao}
                    drawsDto={selectedDrawsDto}
                    deleteDraw={deleteDraws}
                />
            </CustomDialog>

             <CustomDialog
                setIsOpen={setIsFilterDrawsDialogOpen}
                isOpen={isFilterDrawsDialogOpen}
                title={'Filtrar'}
            >
                <FilterDrawsDialog
                    drawFilter={drawFilter}
                    clearFilter={clearFilter}
                    getDraws={filterDraws}
                />
            </CustomDialog>
        </ModuleTemplate>
    );
}

export default Draws;