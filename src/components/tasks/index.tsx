import { useLoaderProvider } from "@/providers/loader/loader-provider";
import CustomDialog from "@/shared/components/custom-dialog";
import IconButton from "@/shared/components/icon-button";
import { useEffect, useState } from "react";
import { IoAdd, IoArchive, IoCheckbox, IoCheckboxOutline, IoFilter, IoSearch, IoTrash } from "react-icons/io5";
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
import Input from "@/shared/components/input";
import ArchiveTasksDialog from "./archive-task-dialog";
import Checkbox from "@/shared/components/checkbox";
import DeleteTasksDialog from "./delete-task-dialog";
import FilterTasksDialog from "./filter-tasks-dialog";

const tasksService: TasksService = new TasksService();
const auth: Auth = new Auth();

let user: UserDto = {};
let taskDao: TaskDao = {};
let tasksDao: TaskDao[] = [];
let selectedTaskDto: TaskDto;
let selectedTasksDto: TaskDto[] = [];
let taskFilter: TaskFilter = { active: true };

const Tasks: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();
    const { setMessage } = useMessageProvider();

    const [isInSelectableMode, setIsInSelectableMode] = useState<boolean>(false);
    const [showingCheckboxes, setShowingCheckboxes] = useState<boolean>(false);
    const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState<boolean>(false);
    const [isUpdateTaskDialogOpen, setIsUpdateTaskDialogOpen] = useState<boolean>(false);
    const [isDuplicateTaskDialogOpen, setIsDuplicateTaskDialogOpen] = useState<boolean>(false);
    const [isArchiveTasksDialogOpen, setIsArchiveTasksDialogOpen] = useState<boolean>(false);
    const [isDeleteTasksDialogOpen, setIsDeleteTasksDialogOpen] = useState<boolean>(false);
    const [isFilterTasksDialogOpen, setIsFilterTasksDialogOpen] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskDto[]>([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowingCheckboxes(isInSelectableMode);
        }, 300);
    }, [isInSelectableMode])

    //#region API
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
        
        const filter: TaskFilter = { ...taskFilter, userId: user.userId };
        const tasks: TaskDto[] = await tasksService.getTasks(filter);

        setTasks(tasks);
    }

    const createTask = async(_taskDao?: TaskDao, executeGetData?: boolean): Promise<void> => {
        _taskDao = _taskDao ?? taskDao;

        setIsLoading(true);

        const execution: Execution = await tasksService.createTask(_taskDao);

        setIsCreateTaskDialogOpen(false);
        setIsDuplicateTaskDialogOpen(false);

        if (execution.successful === true) {

            if (executeGetData !== false) await getData();

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

    const updateTask = async(_taskDao?: TaskDao, executeGetData?: boolean): Promise<void> => {
        _taskDao = _taskDao ?? taskDao;

        setIsLoading(true);
        
        const execution: Execution = await tasksService.updateTask(_taskDao);

        setIsUpdateTaskDialogOpen(false);

        if (execution.successful === true) {

            if (executeGetData !== false) await getData();

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

    const deleteTask = async(filter: TaskFilter, executeGetData?: boolean): Promise<void> => {

        setIsLoading(true);
        
        const execution: Execution = await tasksService.deleteTask(filter);

        setIsUpdateTaskDialogOpen(false);

        if (execution.successful === true) {

            if (executeGetData !== false) await getData();

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

    const archiveTasks = async() => {
        await Promise.all(
            tasksDao.map(taskDao => updateTask(taskDao, false))
        );
        tasksDao = [];
        selectedTasksDto = [];
        setIsInSelectableMode(false);
        setIsArchiveTasksDialogOpen(false);
        await getData();
    }

    const deleteTasks = async() => {
        await Promise.all(
            tasksDao.map(taskDao => deleteTask({ taskId: taskDao.taskId }, false))
        );
        tasksDao = [];
        selectedTasksDto = [];
        setIsInSelectableMode(false);
        setIsDeleteTasksDialogOpen(false);
        await getData();
    }

    const filterTasks = async() => {
        setIsFilterTasksDialogOpen(false);
        await getTasks();
    }
    //#endregion

    //#region Open Dialogs
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

    const openArchiveTaskDialog = (task?: TaskDto) => {
        if (task !== undefined) selectedTasksDto = [ task ];
        setIsArchiveTasksDialogOpen(true);
    }

    const openDeleteTaskDialog = (task?: TaskDto) => {
        if (task !== undefined) selectedTasksDto = [ task ];
        setIsDeleteTasksDialogOpen(true);
    }
    
    const openFilterTasksDialog = () => {
        setIsFilterTasksDialogOpen(true);
    }

    //#endregion

    const handleTitleFilter = (value: string) => {
        taskFilter = {...taskFilter, title: value};
    }

    const toggleIsInSelectableMode = () => {
        selectedTasksDto = [];
        tasksDao = [];
        setIsInSelectableMode(prevValue => !prevValue);
    }

    const onChangeSelectCheckbox = (event: React.ChangeEvent<HTMLInputElement>, task: TaskDto) => {
        if (selectedTasksDto.some((taskDto: TaskDto) => taskDto.taskId === task.taskId) === true) {
            const _selectedTaskDto: TaskDto[] = selectedTasksDto.filter((taskDto: TaskDto) => taskDto.taskId !== task.taskId);
            selectedTasksDto = [ ..._selectedTaskDto ];
        } else {
            selectedTasksDto.push({ ...task });
        }
    }

    const clearFilter = async() => {
        taskFilter = { active: true, userId: user.userId };
        setIsFilterTasksDialogOpen(false);
        await getTasks();
    }

    return (
        <div className="w-full h-full bg-gray-100 pt-10 px-30">
            <div className="fixed bottom-10 right-10 z-50 h-auto">
                <ExpandableFab
                    iconButtons={[
                        <IconButton
                            icon={<IoCheckboxOutline size={30} color="white"/>}
                            className="bg-[var(--secondary)] hover:bg-blue-400 shadow"
                            onClick={toggleIsInSelectableMode}
                        />,
                        <IconButton
                            icon={<IoFilter size={30} color="white"/>}
                            className="bg-[var(--secondary)] hover:bg-blue-400 shadow"
                            onClick={openFilterTasksDialog}
                        />,
                        <IconButton
                            icon={<IoAdd size={30} color="white"/>}
                            className="bg-[var(--secondary)] hover:bg-blue-400 shadow"
                            onClick={openCreateTaskDialog}
                        />
                    ]}
                />
            </div>
            <div className="flex flex-row justify-between px-10 py-5 rounded-t-2xl bg-white">
                <div className="flex flex-row items-end justify-between w-full h-full">
                    <div className="flex flex-row justify-start">
                        <h1 className="flex flex-col justify-center text-white bg-orange-300 rounded-l-md py-1 px-4 shadows">
                            {'Inicio > Pendientes'}
                        </h1>
                        <div className="flex flex-row justify-end items-center px-2 py-1 rounded-r-md bg-orange-300 border-l-2 border-white cursor-pointer hover:bg-blue-300">
                            <Image
                                src={'/assets/img/tasks-icon-white.png'}
                                width={30}
                                height={30}
                                className="" 
                                onClick={openCreateTaskDialog}
                                alt={"Agregar Pendiente"}                        
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[0.25rem] bg-gray-100 rounded-4xl"/>

            <div className="flex flex-col p-10 bg-white flex-1">
               
                <div className="w-full flex flex-row justify-between mb-3">
                    <div className="w-[40%]">
                        <Input
                            id={'search-form'}
                            className="bg-gray-100"
                            containerClassName="w-[100%]"
                            setValue={handleTitleFilter}
                            type="text"
                            placeholder="Buscar"
                            iconButton={
                                <IconButton
                                    id={'search-form'}
                                    onClick={getTasks}
                                    icon={<IoSearch size={20} color="gray"/>}
                                />
                            }
                            disabled={isInSelectableMode}
                        />
                    </div>
                    <div 
                        className={`relative flex flex-row justify-between w-min space-x-2 mb-2
                            transform transition-all duration-300 ease-in-out
                            ${isInSelectableMode === true ? 'translate-y-0 opacity-100' : 'translate-y-[-150%] opacity-0'}
                        `}
                    >
                        <IconButton
                            className="bg-yellow-200 shadow"
                            icon={<IoArchive size={20} color="white"/>}
                            title="Archivar"
                            onClick={() => openArchiveTaskDialog()}
                        />
                        <IconButton
                            className="bg-red-400 shadow"
                            icon={<IoTrash size={20} color="white"/>}
                            title="Eliminar"
                            onClick={() => openDeleteTaskDialog()}
                        />
                    </div>
                </div>

                {tasks.map(
                    (task: TaskDto, index: number) => (
                        <div 
                            key={index} 
                            className="relative flex flex-row justify-center w-full items-center"
                        >
                            {showingCheckboxes === true &&
                                <Checkbox
                                    containerClassName="mb-3 mr-3"
                                    className={`
                                        transform transition-all duration-300 ease-in-out
                                        ${isInSelectableMode === true ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
                                    `}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeSelectCheckbox(event, task)}
                                />
                            }
                            <TaskItem 
                                openUpdateDialog={openUpdateTaskDialog} 
                                openDuplicateDialog={openDuplicateTaskDialog}
                                openArchiveDialog={openArchiveTaskDialog}
                                openDeleteDialog={openDeleteTaskDialog}
                                disabled={isInSelectableMode}
                                {...task} 
                            />
                        </div>
                    )
                )}

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

            <CustomDialog
                setIsOpen={setIsArchiveTasksDialogOpen}
                isOpen={isArchiveTasksDialogOpen}
                title={selectedTasksDto.length === 1 ? 'Archivar Pendiente' : 'Archivar Pendientes'}
            >
                <ArchiveTasksDialog
                    tasksDao={tasksDao}
                    tasksDto={selectedTasksDto}
                    archiveTask={archiveTasks}
                />
            </CustomDialog>

            <CustomDialog
                setIsOpen={setIsDeleteTasksDialogOpen}
                isOpen={isDeleteTasksDialogOpen}
                title={selectedTasksDto.length === 1 ? 'Eliminar Pendiente' : 'Eliminar Pendientes'}
            >
                <DeleteTasksDialog
                    tasksDao={tasksDao}
                    tasksDto={selectedTasksDto}
                    deleteTask={deleteTasks}
                />
            </CustomDialog>

             <CustomDialog
                setIsOpen={setIsFilterTasksDialogOpen}
                isOpen={isFilterTasksDialogOpen}
                title={'Filtrar'}
            >
                <FilterTasksDialog
                    taskFilter={taskFilter}
                    clearFilter={clearFilter}
                    getTasks={filterTasks}
                />
            </CustomDialog>
        </div>
    );
}

export default Tasks;