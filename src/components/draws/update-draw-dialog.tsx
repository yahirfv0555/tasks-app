import { DrawDao, DrawDto } from "@/models";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import validateNotNullableData from "@/shared/functions/validate-not-nullable-data";
import { useEffect } from "react";

export interface UpdateDrawDialogProps {
    updateDraw: () => Promise<void>;
    drawDao: DrawDao;
    drawDto: DrawDto;
}

const UpdateDrawDialog: React.FC<UpdateDrawDialogProps> = props => {
    const { updateDraw, drawDao, drawDto } = props;
    
    useEffect(() => {
        drawDao.drawId = drawDto.drawId;
    }, []);

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
        if (validateData()) await updateDraw();
    }

    return (
        <div className="mt-5 h-[40dvh] w-[40dvw]">
            <div className="flex flex-row justify-between">
                <Input
                    setValue={handleTitle}
                    initialValue={drawDto.title}
                    type="text"
                    label="Título"
                    containerClassName="w-[48%] mb-5"
                    validateData={validateTitle}
                />

                <Input
                    setValue={handleTag}
                    initialValue={drawDto?.tag}
                    type="text"
                    label="Etiqueta"
                    containerClassName="w-[48%] mb-5"
                    validateData={validateTag}
                />
            </div>
            
            <TextArea
                setValue={handleImage}
                label="Descripción"
                initialValue={drawDto.image}
                containerClassName="mb-5"
                validateData={validateImage}
            />

            <Button
                label="Guardar"
                className="bg-orange-300 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default UpdateDrawDialog;