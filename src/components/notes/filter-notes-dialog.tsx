

import Auth from "@/core/middleware/auth";
import { NoteFilter, TagDto, TagFilter } from "@/models/note";
import { UserDto } from "@/models/user";
import { useLoaderProvider } from "@/providers/loader/loader-provider";
import NotesService from "@/services/notes/notes-service";
import Button from "@/shared/components/button";
import IconButton from "@/shared/components/icon-button";
import Input from "@/shared/components/input";
import Select from "@/shared/components/select";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoFilterOutline } from "react-icons/io5";

export interface FilterNotesDialogProps {
    getNotes: () => Promise<void>;
    clearFilter: () => void;
    noteFilter: NoteFilter;
}

const auth: Auth = new Auth();
const notesService: NotesService = new NotesService();

let user: UserDto = {};

const FilterNotesDialog: React.FC<FilterNotesDialogProps> = props => {
    const { getNotes, clearFilter, noteFilter } = props;

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
        const filter: TagFilter = { ...noteFilter, userId: user.userId };
        const tags: TagDto[] = await notesService.getTags(filter);

        setTags(tags);
    }
    //#endregion

    //#region Handles
    const handleTitle = (value: string) => {
        noteFilter.title = value;
    }

    const handleTags = (value: string) => {
        noteFilter.tags = value;
    }
    //#endregion

    const submit = async(): Promise<void> => {
        await getNotes();
    }

    return (
        <div className="mt-5 h-[32.5dvh] w-[40dvw]">
            <Input
                id="filter-form"
                setValue={handleTitle}
                type="text"
                label="Título"
                containerClassName="w-full mb-5"
                initialValue={noteFilter.title}
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

export default FilterNotesDialog;