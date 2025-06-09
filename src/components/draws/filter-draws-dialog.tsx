

import Auth from "@/core/middleware/auth";
import { DrawFilter, TagDto, TagFilter, UserDto } from "@/models";
import { useLoaderProvider } from "@/providers/loader/loader-provider";
import DrawsService from "@/services/draws/draws-service";
import Button from "@/shared/components/button";
import IconButton from "@/shared/components/icon-button";
import Input from "@/shared/components/input";
import Select from "@/shared/components/select";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoFilterOutline } from "react-icons/io5";

export interface FilterDrawsDialogProps {
    getDraws: () => Promise<void>;
    clearFilter: () => void;
    drawFilter: DrawFilter;
}

const auth: Auth = new Auth();
const drawsService: DrawsService = new DrawsService();

let user: UserDto = {};

const FilterDrawsDialog: React.FC<FilterDrawsDialogProps> = props => {
    const { getDraws, clearFilter, drawFilter } = props;

    const { setIsLoading } = useLoaderProvider();

    const [tags, setTags] = useState<TagDto[]>([]);

    useEffect(() => {
        getData();
    }, []);

    //#region API
    const getData = async (): Promise<void> => {
        setIsLoading(true);

        getUser();
        await getTags();

        setIsLoading(false);
    }

    const getUser = (): void => {
        const userAux: UserDto | undefined = auth.getUser();

        if (userAux === undefined) {
            return auth.clearSession();
        }

        user = userAux;
    }

    const getTags = async(): Promise<void> => {
        const filter: TagFilter = { ...drawFilter, userId: user.userId };
        const tags: TagDto[] = await drawsService.getTags(filter);

        setTags(tags);
    }
    //#endregion

    //#region Handles
    const handleTitle = (value: string) => {
        drawFilter.title = value;
    }

    const handleTags = (value: string) => {
        drawFilter.tags = value;
    }
    //#endregion

    const submit = async(): Promise<void> => {
        await getDraws();
    }

    return (
        <div className="mt-5 h-[32.5dvh] w-[40dvw]">
            <Input
                id="filter-form"
                setValue={handleTitle}
                type="text"
                label="Título"
                containerClassName="w-full mb-5"
                initialValue={drawFilter.title}
            />

           <Select
                label="Etiqueta"
                options={tags}
                labelField="tag"
                valueField="tag"
                setValue={handleTags}
                containerClassName="mt-2 mb-6"
                isMultiple={true}
           />
            
            <div className="flex flex-row justify-between">
                <div className="w-[92%]">
                    <Button
                        id="filter-form"
                        label="Buscar"
                        className="bg-orange-300 border-none text-white h-full w-full"
                        onClick={submit}
                    />
                </div>
                <div 
                    title="Borrar Filtros" 
                    className="w-[7%] rounded-md bg-red-400 flex flex-row justify-center items-center"
                > 
                    <IconButton
                        onClick={clearFilter}
                        className="p-0"
                        icon={
                            <div className="relative inline-block w-7 h-5 -mb-1">
                                <IoFilterOutline className="absolute inset-0" size={20} color="white"/>
                                <IoCloseOutline className="absolute top-0 right-0 rounded-full" color="white" size={10}/>
                            </div>
                        }
                    />
                </div>
            </div>  

        </div>
    );
}

export default FilterDrawsDialog;