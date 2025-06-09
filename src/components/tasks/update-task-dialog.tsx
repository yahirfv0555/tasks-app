import { TaskDao, TaskDto } from "@/models";
import Button from "@/shared/components/button";
import { ErrorMessageProps } from "@/shared/components/error-message";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import validateNotNullableData from "@/shared/functions/validate-not-nullable-data";
import { useEffect } from "react";

export interface UpdateTaskDialogProps {
    updateTask: () => Promise<void>;
    taskDao: TaskDao;
    taskDto: TaskDto;
}

const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = props => {
    const { updateTask, taskDao, taskDto } = props;
    
    useEffect(() => {
        taskDao.taskId = taskDto.taskId;
    }, []);

    //#region Handles
    const handleTitle = (value: string) => {
        taskDao.title = value;
    }
    
    const handleDescription = (value: string) => {
        taskDao.description = value;
    }
    
    const handleDate = (value: Date) => {
        taskDao.date = value;
    }

    //#endregion

    //#region Validaciones
    const validateTitle = (value?: string) => validateNotNullableData('título', value);

    const validateDescription = (value?: string) => validateNotNullableData('descripción', value)

    const validateDate = (value?: Date): ErrorMessageProps => {

        if (value === undefined) {
            return {
                showing: true,
                message: 'El valor de fecha no puede estar vacío'
            }
        }

        if (value < new Date()) {
            return {
                showing: true,
                message: 'La fecha no puede ser menor a la actual'
            }
        }

        return { showing: false };

    }

    const validateData = (): boolean => !validateTitle(taskDao.title).showing && !validateDescription(taskDao.description).showing && !validateDate(taskDao.date).showing;
    //#endregion

    const submit = async(): Promise<void> => {
        if (validateData()) await updateTask();
    }

    return (
        <div className="mt-5 h-[40dvh] w-[40dvw]">
            <div className="flex flex-row justify-between">
                <Input
                    setValue={handleTitle}
                    initialValue={taskDto.title}
                    type="text"
                    label="Título"
                    containerClassName="w-[48%] mb-5"
                    validateData={validateTitle}
                />
                
                <Input
                    setValue={handleDate}
                    initialValue={taskDto.date}
                    type="date"
                    label="Fecha"
                    containerClassName="w-[48%] mb-5"
                    validateData={validateDate}
                    minDate={new Date()}
                />
            </div>
            
            <TextArea
                setValue={handleDescription}
                label="Descripción"
                initialValue={taskDto.description}
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

export default UpdateTaskDialog;