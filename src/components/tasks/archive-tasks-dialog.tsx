import { useEffect } from "react";
import { TaskDao, TaskDto } from "@/models/task";
import Button from "@/shared/components/button";

export interface ArchiveTasksDialogProps {
    archiveTask: () => Promise<void>;
    tasksDao: TaskDao[];
    tasksDto: TaskDto[];
}

const ArchiveTasksDialog: React.FC<ArchiveTasksDialogProps> = props => {
    const { archiveTask, tasksDao, tasksDto } = props;
    
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

        await archiveTask();

    }

    return (
        <div className="mt-5 h-[20dvh] w-[20dvw] flex flex-col justify-between">
            <div>
                {'¿Estás seguro de querer archivar lo seleccionado?'}
            </div>
            
            <Button
                label="Archivar"
                className="bg-orange-300 border-none text-white"
                onClick={submit}
            />

        </div>
    );
}

export default ArchiveTasksDialog;