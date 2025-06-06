import { NoteDao, NoteDto } from "@/models/note";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import validateNotNullableData from "@/shared/functions/validate-not-nullable-data";
import { useEffect } from "react";

export interface UpdateNoteDialogProps {
    updateNote: () => Promise<void>;
    noteDao: NoteDao;
    noteDto: NoteDto;
}

const UpdateNoteDialog: React.FC<UpdateNoteDialogProps> = props => {
    const { updateNote, noteDao, noteDto } = props;
    
    useEffect(() => {
        noteDao.noteId = noteDto.noteId;
    }, []);

    //#region Handles
    const handleTitle = (value: string) => {
        noteDao.title = value;
    }

    const handleTag = (value: string) => {
        noteDao.tag = value;
    }
    
    const handleDescription = (value: string) => {
        noteDao.description = value;
    }
    //#endregion

    //#region Validaciones
    const validateTitle = (value?: string) => validateNotNullableData('título', value);
    
    const validateTag = (value?: string) => validateNotNullableData('etiqueta', value);

    const validateDescription = (value?: string) => validateNotNullableData('descripción', value)

    const validateData = (): boolean => !validateTitle(noteDao.title).showing && !validateDescription(noteDao.description).showing;
    //#endregion

    const submit = async(): Promise<void> => {
        if (validateData()) await updateNote();
    }

    return (
        <div className="mt-5 h-[40dvh] w-[40dvw]">
            <div className="flex flex-row justify-between">
                <Input
                    setValue={handleTitle}
                    initialValue={noteDto.title}
                    type="text"
                    label="Título"
                    containerClassName="w-[48%] mb-5"
                    validateData={validateTitle}
                />

                <Input
                    setValue={handleTag}
                    initialValue={noteDto?.tag}
                    type="text"
                    label="Etiqueta"
                    containerClassName="w-[48%] mb-5"
                    validateData={validateTag}
                />
            </div>
            
            <TextArea
                setValue={handleDescription}
                label="Descripción"
                initialValue={noteDto.description}
                containerClassName="mb-5"
                validateData={validateDescription}
            />

            <Button
                label="Guardar"
                className="bg-orange-300 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default UpdateNoteDialog;