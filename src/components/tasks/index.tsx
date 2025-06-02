import { useLoaderProvider } from "@/providers/loader/loader-provider";
import CustomDialog from "@/shared/components/custom-dialog";
import IconButton from "@/shared/components/icon-button";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import CreateTaskDialog from "./create-task-dialog";
import TasksService from "@/services/tasks/tasks-service";
import { Execution, UserDto } from "@/models";
import { TaskDao, TaskDto, TaskFilter } from "@/models/task";
import { useMessageProvider } from "@/providers/messages/message-provider";
import Auth from "@/core/middleware/auth";
import TaskItem from "./task-item";

const tasksService: TasksService = new TasksService();
const auth: Auth = new Auth();

let user: UserDto = {};
let taskDao: TaskDao = {};

const Tasks: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();
    const { setMessage } = useMessageProvider();

    const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskDto[]>([]);
    
    useEffect(() => {
        getData();
    }, []);

    const getData = async (): Promise<void> => {
        setIsLoading(true);

        getUser();
        await getTasks();

        setIsLoading(false);
    }

    const getUser = (): void => {
        const userAux: UserDto | undefined = auth.getUser();

        if (userAux === undefined) {
            return auth.clearSession();
        }

        user = userAux;
    }

    const getTasks = async(): Promise<void> => {
        const filter: TaskFilter = {
            userId: user.userId
        };

        const tasks: TaskDto[] = await tasksService.getTasks(filter);

        setTasks(tasks);
    }

    const openCreateTaskDialog = () => {
        setIsCreateTaskDialogOpen(true);
    }

    const createTask = async() => {
        setIsLoading(true);

        const execution: Execution = await tasksService.createTask(taskDao);

        setIsCreateTaskDialogOpen(false);

        if (execution.successful === true) {

            await getData();

            setMessage({
                type: 'success',
                title: 'Pendiente',
                message: execution.message
            });
        } else {
            setMessage({
                type: 'error',
                title: 'Error',
                message: execution.message
            });
        }

        setIsLoading(false);
    }

    return (
        <div className="w-full h-full bg-gradient-to-r from-[var(--secondary)] via-blue-100 to-blue-400 pt-10 px-30">
            <div className="flex flex-col p-10 rounded-t-2xl bg-white">

                <div className="flex flex-row justify-between">
                    <h1 className="font-bold">Pendientes</h1>
                    <IconButton
                        icon={<IoAdd size={30} color="black"/>}
                        className="bg-[var(--secondary)]"
                        onClick={openCreateTaskDialog}
                    />
                </div>

                <div className="h-[0.25rem] bg-[var(--secondary)] my-10"/>

                <div>
                    {tasks.map(
                        (task: TaskDto, index: number) => <TaskItem key={index} index={index} {...task} />
                    )}
                </div>
                
                <CustomDialog
                    isOpen={isCreateTaskDialogOpen}
                    setIsOpen={setIsCreateTaskDialogOpen}
                    title="Crear pendiente"
                >
                    <CreateTaskDialog 
                        createTask={createTask} 
                        taskDao={taskDao}
                    /> 
                </CustomDialog>

            </div>
        </div>
    );
}

export default Tasks;