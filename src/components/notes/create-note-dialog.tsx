import { NoteDao, NoteDto } from "@/models/note";
import Button from "@/shared/components/button";
import { ErrorMessageProps } from "@/shared/components/error-message";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import validateNotNullableData from "@/shared/functions/validate-not-nullable-data";
import { useState } from "react";

export interface CreateNoteDialogProps {
    createNote: () => Promise<void>;
    noteDao: NoteDao;
    noteDto?: NoteDto;
}

const CreateNoteDialog: React.FC<CreateNoteDialogProps> = props => {
    const { createNote, noteDao, noteDto } = props;

    const [startValidation, setStartValidation] = useState<boolean>(false);
    
    //#region Handles
    const handleTitle = (value: string) => {
        noteDao.title = value;
    }
    
    const handleDescription = (value: string) => {
        noteDao.description = value;
    }
    //#endregion

    //#region Validaciones
    const validateTitle = (value?: string) => validateNotNullableData('título', value);

    const validateDescription = (value?: string) => validateNotNullableData('descripción', value)

    const validateData = (): boolean => !validateTitle(noteDao.title).showing && !validateDescription(noteDao.description).showing;
    //#endregion

    const submit = async(): Promise<void> => {
        setStartValidation(prevValue => !prevValue);
        if (validateData()) await createNote();
    }

    return (
        <div className="mt-5 h-[40dvh] w-[40dvw]">
            <div className="flex flex-row justify-between">
                <Input
                    setValue={handleTitle}
                    type="text"
                    label="Título"
                    containerClassName="w-[48%] mb-5"
                    initialValue={noteDto?.title}
                    validateData={validateTitle}
                    startValidation={startValidation}
                />
            </div>
            
            <TextArea
                setValue={handleDescription}
                label="Descripción"
                containerClassName="mb-5"
                validateData={validateDescription}
                initialValue={noteDto?.description}
                startValidation={startValidation}
            />

            <Button
                label="Guardar"
                className="bg-orange-300 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default CreateNoteDialog;