import routes from "@/core/config/routes";
import Auth from "@/core/middleware/auth";
import NotesService from "@/services/notes/notes-service";
import Input from "@/shared/components/input";
import ArchiveNotesDialog from "./archive-notes-dialog";
import Checkbox from "@/shared/components/checkbox";
import ModuleTemplate from "@/shared/components/module-template";
import CustomDialog from "@/shared/components/custom-dialog";
import IconButton from "@/shared/components/icon-button";
import NoteItem from "./note-item";
import DeleteNotesDialog from "./delete-notes-dialog";
import CreateNoteDialog from "./create-note-dialog";
import FilterNotesDialog from "./filter-notes-dialog";
import UpdateNoteDialog from "./update-note-dialog";
import { useEffect, useState } from "react";
import { IoAdd, IoArchive, IoCheckboxOutline, IoFilter, IoSearch, IoTrash } from "react-icons/io5";
import { useMessageProvider } from "@/providers/message/message-provider";
import { useLoaderProvider } from "@/providers/loader/loader-provider";
import { Execution, UserDto } from "@/models";
import { NoteDao, NoteDto, NoteFilter } from "@/models/note";

const notesService: NotesService = new NotesService();
const auth: Auth = new Auth();

let user: UserDto = {};
let noteDao: NoteDao = {};
let notesDao: NoteDao[] = [];
let selectedNoteDto: NoteDto;
let selectedNotesDto: NoteDto[] = [];
let noteFilter: NoteFilter = { active: true };

const Notes: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();
    const { setMessage } = useMessageProvider();

    const [isInSelectableMode, setIsInSelectableMode] = useState<boolean>(false);
    const [showingCheckboxes, setShowingCheckboxes] = useState<boolean>(false);
    const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState<boolean>(false);
    const [isUpdateNoteDialogOpen, setIsUpdateNoteDialogOpen] = useState<boolean>(false);
    const [isDuplicateNoteDialogOpen, setIsDuplicateNoteDialogOpen] = useState<boolean>(false);
    const [isArchiveNotesDialogOpen, setIsArchiveNotesDialogOpen] = useState<boolean>(false);
    const [isDeleteNotesDialogOpen, setIsDeleteNotesDialogOpen] = useState<boolean>(false);
    const [isFilterNotesDialogOpen, setIsFilterNotesDialogOpen] = useState<boolean>(false);
    const [notes, setNotes] = useState<NoteDto[]>([]);

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
        await getNotes();

        setIsLoading(false);
    }

    const getUser = (): void => {
        const userAux: UserDto | undefined = auth.getUser();

        if (userAux === undefined) {
            return auth.clearSession();
        }

        user = userAux;
    }

    const getNotes = async(): Promise<void> => {
        
        const filter: NoteFilter = { ...noteFilter, userId: user.userId };
        const notes: NoteDto[] = await notesService.getNotes(filter);

        setNotes(notes);
    }

    const createNote = async(_noteDao?: NoteDao, executeGetData?: boolean): Promise<void> => {
        _noteDao = _noteDao ?? noteDao;

        setIsLoading(true);

        const execution: Execution = await notesService.createNote(_noteDao);

        setIsCreateNoteDialogOpen(false);
        setIsDuplicateNoteDialogOpen(false);

        noteDao = {};

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

    const updateNote = async(_noteDao?: NoteDao, executeGetData?: boolean): Promise<void> => {
        _noteDao = _noteDao ?? noteDao;

        console.log(_noteDao);

        setIsLoading(true);
        
        const execution: Execution = await notesService.updateNote(_noteDao);

        setIsUpdateNoteDialogOpen(false);

        noteDao = {};

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

    const deleteNote = async(filter: NoteFilter, executeGetData?: boolean): Promise<void> => {

        setIsLoading(true);
        
        const execution: Execution = await notesService.deleteNote(filter);

        setIsUpdateNoteDialogOpen(false);

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

    const archiveNotes = async() => {
        await Promise.all(
            notesDao.map(noteDao => updateNote(noteDao, false))
        );
        notesDao = [];
        selectedNotesDto = [];
        setIsInSelectableMode(false);
        setIsArchiveNotesDialogOpen(false);
        await getData();
    }

    const deleteNotes = async() => {
        await Promise.all(
            notesDao.map(noteDao => deleteNote({ noteId: noteDao.noteId }, false))
        );
        notesDao = [];
        selectedNotesDto = [];
        setIsInSelectableMode(false);
        setIsDeleteNotesDialogOpen(false);
        await getData();
    }

    const filterNotes = async() => {
        setIsFilterNotesDialogOpen(false);
        await getNotes();
    }
    //#endregion

    //#region Open Dialogs
    const openCreateNoteDialog = () => {
        setIsCreateNoteDialogOpen(true);
    }

    const openUpdateNoteDialog = (note: NoteDto) => {
        selectedNoteDto = { ...note };
        setIsUpdateNoteDialogOpen(true);
    }

    const openDuplicateNoteDialog = (note: NoteDto) => {
        selectedNoteDto = { ...note };
        setIsDuplicateNoteDialogOpen(true);
    }

    const openArchiveNoteDialog = (note?: NoteDto) => {
        if (note !== undefined) selectedNotesDto = [ note ];
        setIsArchiveNotesDialogOpen(true);
    }

    const openDeleteNoteDialog = (note?: NoteDto) => {
        if (note !== undefined) selectedNotesDto = [ note ];
        setIsDeleteNotesDialogOpen(true);
    }
    
    const openFilterNotesDialog = () => {
        setIsFilterNotesDialogOpen(true);
    }

    //#endregion

    const handleTitleFilter = (value: string) => {
        noteFilter = {...noteFilter, title: value};
    }

    const toggleIsInSelectableMode = () => {
        selectedNotesDto = [];
        notesDao = [];
        setIsInSelectableMode(prevValue => !prevValue);
    }

    const onChangeSelectCheckbox = (event: React.ChangeEvent<HTMLInputElement>, note: NoteDto) => {
        if (selectedNotesDto.some((noteDto: NoteDto) => noteDto.noteId === note.noteId) === true) {
            const _selectedNoteDto: NoteDto[] = selectedNotesDto.filter((noteDto: NoteDto) => noteDto.noteId !== note.noteId);
            selectedNotesDto = [ ..._selectedNoteDto ];
        } else {
            selectedNotesDto.push({ ...note });
        }
    }

    const clearFilter = async() => {
        noteFilter = { active: true, userId: user.userId };
        setIsFilterNotesDialogOpen(false);
        await getNotes();
    }

    return (
        <ModuleTemplate 
            openCreateDialog={openCreateNoteDialog}
            route={routes[0]}
            actions={[
                <IconButton
                    icon={<IoCheckboxOutline size={30} color="white"/>}
                    className="bg-[var(--secondary)] hover:bg-green-400 shadow"
                    onClick={toggleIsInSelectableMode}
                />,
                <IconButton
                    icon={<IoFilter size={30} color="white"/>}
                    className="bg-[var(--secondary)] hover:bg-green-400 shadow"
                    onClick={openFilterNotesDialog}
                />,
                <IconButton
                    icon={<IoAdd size={30} color="white"/>}
                    className="bg-[var(--secondary)] hover:bg-green-400 shadow"
                    onClick={openCreateNoteDialog}
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
                                onClick={getNotes}
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
                        onClick={() => isInSelectableMode === true ? openArchiveNoteDialog() : {}}
                    />
                    <IconButton
                        className="bg-red-400 shadow"
                        icon={<IoTrash size={20} color="white"/>}
                        title="Eliminar"
                        onClick={() => isInSelectableMode === true ? openDeleteNoteDialog() : {}}
                    />
                </div>
            </div>

            {notes.map(
                (note: NoteDto, index: number) => (
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
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSelectCheckbox(event, note)}
                            />
                        }
                        <NoteItem 
                            openUpdateDialog={openUpdateNoteDialog} 
                            openDuplicateDialog={openDuplicateNoteDialog}
                            openArchiveDialog={openArchiveNoteDialog}
                            openDeleteDialog={openDeleteNoteDialog}
                            disabled={isInSelectableMode}
                            {...note} 
                        />
                    </div>
                )
            )}

            <CustomDialog
                    isOpen={isCreateNoteDialogOpen}
                    setIsOpen={setIsCreateNoteDialogOpen}
                    title="Crear Pendiente"
                >
                <CreateNoteDialog 
                    createNote={createNote} 
                    noteDao={noteDao}
                /> 
            </CustomDialog>
            
            <CustomDialog
                isOpen={isUpdateNoteDialogOpen}
                setIsOpen={setIsUpdateNoteDialogOpen}
                title="Editar Pendiente"
            >
                <UpdateNoteDialog
                    updateNote={updateNote} 
                    noteDao={noteDao}
                    noteDto={selectedNoteDto}
                /> 
            </CustomDialog>

            <CustomDialog
                    isOpen={isDuplicateNoteDialogOpen}
                    setIsOpen={setIsDuplicateNoteDialogOpen}
                    title="Crear Pendiente"
                >
                <CreateNoteDialog
                    createNote={createNote} 
                    noteDao={noteDao}
                    noteDto={selectedNoteDto}
                /> 
            </CustomDialog>

            <CustomDialog
                setIsOpen={setIsArchiveNotesDialogOpen}
                isOpen={isArchiveNotesDialogOpen}
                title={selectedNotesDto.length === 1 ? 'Archivar Pendiente' : 'Archivar Pendientes'}
            >
                <ArchiveNotesDialog
                    notesDao={notesDao}
                    notesDto={selectedNotesDto}
                    archiveNote={archiveNotes}
                />
            </CustomDialog>

            <CustomDialog
                setIsOpen={setIsDeleteNotesDialogOpen}
                isOpen={isDeleteNotesDialogOpen}
                title={selectedNotesDto.length === 1 ? 'Eliminar Pendiente' : 'Eliminar Pendientes'}
            >
                <DeleteNotesDialog
                    notesDao={notesDao}
                    notesDto={selectedNotesDto}
                    deleteNote={deleteNotes}
                />
            </CustomDialog>

             <CustomDialog
                setIsOpen={setIsFilterNotesDialogOpen}
                isOpen={isFilterNotesDialogOpen}
                title={'Filtrar'}
            >
                <FilterNotesDialog
                    noteFilter={noteFilter}
                    clearFilter={clearFilter}
                    getNotes={filterNotes}
                />
            </CustomDialog>
        </ModuleTemplate>
    );
}

export default Notes;