

import { NoteFilter } from "@/models/note";
import Button from "@/shared/components/button";
import IconButton from "@/shared/components/icon-button";
import Input from "@/shared/components/input";
import { IoCloseOutline, IoFilterOutline } from "react-icons/io5";

export interface FilterNotesDialogProps {
    getNotes: () => Promise<void>;
    clearFilter: () => void;
    noteFilter: NoteFilter;
}

const FilterNotesDialog: React.FC<FilterNotesDialogProps> = props => {
    const { getNotes, clearFilter, noteFilter } = props;

    //#region Handles
    const handleTitle = (value: string) => {
        noteFilter.title = value;
    }
    
    const handleActive = (value: boolean) => {
        noteFilter.active = value;
    }

    //#endregion

    const submit = async(): Promise<void> => {
        await getNotes();
    }

    return (
        <div className="mt-5 h-[40dvh] w-[40dvw]">
            <Input
                id="filter-form"
                setValue={handleTitle}
                type="text"
                label="Título"
                containerClassName="w-full mb-5"
                initialValue={noteFilter.title}
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