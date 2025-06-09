import { useEffect } from "react";
import { TaskDao, TaskDto } from "@/models";
import Button from "@/shared/components/button";

export interface DeleteTasksDialogProps {
    deleteTask: () => Promise<void>;
    tasksDao: TaskDao[];
    tasksDto: TaskDto[];
}

const DeleteTasksDialog: React.FC<DeleteTasksDialogProps> = props => {
    const { deleteTask, tasksDao, tasksDto } = props;
    
    useEffect(() => {
        setTasksDao();
    }, []);

    const setTasksDao = () => {
        for (const taskDto of tasksDto) {
            tasksDao.push({ taskId: taskDto.taskId });
        }
    }

    const submit = async(): Promise<void> => {
        
        for (const taskDao of tasksDao) {
            taskDao.active = false;
        }

        await deleteTask();

    }

    return (
        <div className="mt-5 h-[20dvh] w-[20dvw] flex flex-col justify-between">
            <div>
                {'¿Estás seguro de querer eliminar lo seleccionado?'}
            </div>
            
            <Button
                label="Eliminar"
                className="bg-red-400 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default DeleteTasksDialog;