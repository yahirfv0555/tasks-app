import { useLoaderProvider } from "@/providers/loader/loader-provider";
import CustomDialog from "@/shared/components/custom-dialog";
import IconButton from "@/shared/components/icon-button";
import { useEffect, useState } from "react";
import { IoAdd, IoCheckbox, IoCheckboxOutline, IoFilter } from "react-icons/io5";
import CreateTaskDialog from "./create-task-dialog";
import TasksService from "@/services/tasks/tasks-service";
import { Execution, UserDto } from "@/models";
import { TaskDao, TaskDto, TaskFilter } from "@/models/task";
import { useMessageProvider } from "@/providers/messages/message-provider";
import Auth from "@/core/middleware/auth";
import TaskItem from "./task-item";
import UpdateTaskDialog from "./update-task-dialog";
import { ErrorMessageProps } from "@/shared/components/error-message";
import ExpandableFab from "@/shared/components/expandable-fab";
import Image from "next/image";

const tasksService: TasksService = new TasksService();
const auth: Auth = new Auth();

let user: UserDto = {};
let taskDao: TaskDao = {};
let selectedTaskDto: TaskDto;

const Tasks: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();
    const { setMessage } = useMessageProvider();

    const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState<boolean>(false);
    const [isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen] = useState<boolean>(false);
    const [isDuplicateTaskDialogOpen, setIsDuplicateTaskDialogOpen] = useState<boolean>(false);
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

    const openUpdateTaskDialog = (task: TaskDto) => {
        selectedTaskDto = { ...task };
        setIsUpdateTaskDialogOpen(true);
    }

    const openDuplicateTaskDialog = (task: TaskDto) => {
        selectedTaskDto = { ...task };
        setIsDuplicateTaskDialogOpen(true);
    }

    const createTask = async() => {
        setIsLoading(true);

        const execution: Execution = await tasksService.createTask(taskDao);

        setIsCreateTaskDialogOpen(false);
        setIsDuplicateTaskDialogOpen(false);

        if (execution.successful === true) {

            await getData();

            setMessage({
                type: 'success',
                title: 'Exitoso',
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

    const updateTask = async() => {

        setIsLoading(true);
        
        const execution: Execution = await tasksService.updateTask(taskDao);

        setIsUpdateTaskDialogOpen(false);

        if (execution.successful === true) {

            await getData();

            setMessage({
                type: 'success',
                title: 'Exitoso',
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
        <div className="w-full h-full bg-gray-100 pt-10 px-30">
            <div className="fixed bottom-10 right-10 z-50 h-auto">
                <ExpandableFab
                    iconButtons={[
                        <IconButton
                            icon={<IoCheckboxOutline size={30} color="white"/>}
                            className="bg-[var(--secondary)] hover:bg-blue-400 shadow"
                            onClick={openCreateTaskDialog}
                        />,
                        <IconButton
                            icon={<IoFilter size={30} color="white"/>}
                            className="bg-[var(--secondary)] hover:bg-blue-400 shadow"
                            onClick={openCreateTaskDialog}
                        />,
                        <IconButton
                            icon={<IoAdd size={30} color="white"/>}
                            className="bg-[var(--secondary)] hover:bg-blue-400 shadow"
                            onClick={openCreateTaskDialog}
                        />
                    ]}
                />
            </div>
            <div className="flex flex-col p-10 rounded-t-2xl bg-white">
                <div className="flex flex-row justify-start">
                    <h1 className="text-white/100 bg-orange-300 rounded-l-md py-2 px-4">{'Inicio > Pendientes'}</h1>
                    <div className="flex flex-row justify-end items-center p-2 rounded-r-md bg-orange-300 border-l-1 border-white cursor-pointer hover:bg-blue-300">
                        <Image
                            src={'/assets/img/tasks-icon.png'}
                            width={30}
                            height={30}
                            className="" 
                            onClick={openCreateTaskDialog}
                            alt={"Agregar Pendiente"}                        
                        />
                    </div>
                </div>
            </div>

            <div className="h-[0.25rem] bg-gray-100 rounded-4xl"/>

            <div className="flex flex-col p-10 bg-white">
                <div>
                    {tasks.map(
                        (task: TaskDto, index: number) => (
                            <TaskItem 
                                key={index} 
                                openUpdateDialog={openUpdateTaskDialog} 
                                openDuplicateDialog={openDuplicateTaskDialog}
                                {...task} 
                            />
                        )
                    )}
                </div>

            </div>

            <CustomDialog
                    isOpen={isCreateTaskDialogOpen}
                    setIsOpen={setIsCreateTaskDialogOpen}
                    title="Crear Pendiente"
                >
                <CreateTaskDialog 
                    createTask={createTask} 
                    taskDao={taskDao}
                /> 
            </CustomDialog>
            
            <CustomDialog
                isOpen={isUpdateTaskDialogOpen}
                setIsOpen={setIsUpdateTaskDialogOpen}
                title="Editar Pendiente"
            >
                <UpdateTaskDialog
                    updateTask={updateTask} 
                    taskDao={taskDao}
                    taskDto={selectedTaskDto}
                /> 
            </CustomDialog>

            <CustomDialog
                    isOpen={isDuplicateTaskDialogOpen}
                    setIsOpen={setIsDuplicateTaskDialogOpen}
                    title="Crear Pendiente"
                >
                <CreateTaskDialog
                    createTask={createTask} 
                    taskDao={taskDao}
                    taskDto={selectedTaskDto}
                /> 
            </CustomDialog>
        </div>
    );
}

export default Tasks;