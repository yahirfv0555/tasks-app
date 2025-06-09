import { DrawDao, DrawDto } from "@/models";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import validateNotNullableData from "@/shared/functions/validate-not-nullable-data";
import { useState } from "react";

export interface CreateDrawDialogProps {
    createDraw: () => Promise<void>;
    drawDao: DrawDao;
    drawDto?: DrawDto;
}

const CreateDrawDialog: React.FC<CreateDrawDialogProps> = props => {
    const { createDraw, drawDao, drawDto } = props;

    const [startValidation, setStartValidation] = useState<boolean>(false);
    
    //#region Handles
    const handleTitle = (value: string) => {
        drawDao.title = value;
    }

    const handleTag = (value: string) => {
        drawDao.tag = value;
    }
    
    const handleImage = (value: string) => {
        drawDao.image = value;
    }
    //#endregion

    //#region Validaciones
    const validateTitle = (value?: string) => validateNotNullableData('título', value);

    const validateTag = (value?: string) => validateNotNullableData('etiqueta', value);

    const validateImage = (value?: string) => validateNotNullableData('descripción', value)

    const validateData = (): boolean => !validateTitle(drawDao.title).showing && !validateImage(drawDao.image).showing;
    //#endregion

    const submit = async(): Promise<void> => {
        setStartValidation(prevValue => !prevValue);
        if (validateData()) await createDraw();
    }

    return (
        <div className="mt-5 h-[40dvh] w-[40dvw]">
            <div className="flex flex-row justify-between">
                <Input
                    setValue={handleTitle}
                    type="text"
                    label="Título"
                    containerClassName="w-[48%] mb-5"
                    initialValue={drawDto?.title}
                    validateData={validateTitle}
                    startValidation={startValidation}
                />

                <Input
                    setValue={handleTag}
                    type="text"
                    label="Etiqueta"
                    containerClassName="w-[48%] mb-5"
                    initialValue={drawDto?.tag}
                    validateData={validateTag}
                    startValidation={startValidation}
                />
            </div>
            
            <TextArea
                setValue={handleImage}
                label="Descripción"
                containerClassName="mb-5"
                validateData={validateImage}
                initialValue={drawDto?.image}
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

export default CreateDrawDialog;