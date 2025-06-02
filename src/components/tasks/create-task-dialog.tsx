import { TaskDao } from "@/models/task";
import Button from "@/shared/components/button";
import Input from "@/shared/components/input";
import TextArea from "@/shared/components/textarea";
import { Description } from "@headlessui/react";
import { useState } from "react";

export interface CreateTaskDialogProps {
    createTask: () => Promise<void>;
    taskDao: TaskDao;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = props => {
    const { createTask, taskDao } = props;
    
    const handleTitle = (value: string) => {
        taskDao.title = value;
    }
    
    const handleDescription = (value: string) => {
        taskDao.description = value;
    }
    
    const handleDate = (value: Date) => {
        taskDao.date = value;
    }

    const submit = async(): Promise<void> => {
        await createTask();
    }

    return (
        <div className="mt-5">
            <div className="flex flex-row justify-between">
                <Input
                    setValue={handleTitle}
                    type="text"
                    label="Título"
                    containerClassName="w-[48%] mb-5"
                />
                
                <Input
                    setValue={handleDate}
                    type="date"
                    label="Fecha"
                    containerClassName="w-[48%] mb-5"
                />
            </div>
            
            <TextArea
                setValue={handleDescription}
                label="Descripción"
                className="mb-5"
            />

            <Button
                label="Guardar"
                className="bg-blue-400 font-bold border-none"
                onClick={submit}
            />

        </div>
    );
}

export default CreateTaskDialog;