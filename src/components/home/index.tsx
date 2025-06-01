import { AppRoute } from "@/models/general";
import routes from "@/core/config/routes";
import MenuItem from "./menu-item";
import Auth from "@/core/middleware/auth";
import { useEffect, useState } from "react";
import { TaskDto, TaskFilter } from "@/models/task";
import TasksService from "@/services/tasks/tasks-service";
import NowTaskItem from "./now-task-item";
import { useLoaderProvider } from "@/providers/loader/loader-provider";
import { UserDto } from "@/models";
import SlideDown from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';
import { motion } from "framer-motion";
import ToggleButton, { ToggleButtonOption } from "@/shared/components/toggle-button";

const auth: Auth = new Auth();
const tasksService: TasksService = new TasksService();

let user: UserDto = {};

const moduleOptions: ToggleButtonOption[] = [
    {
        name: 'Notas',
        color: 'orange-400'
    },
    {
        name: 'Dibujos',
        color: 'purple-400'
    }
];


const Home: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();

    const [showingTodayTasks, setShowingTodayTasks] = useState<boolean>(true);
    const [showingNotesAndDraws, setShowingNotesAndDraws] = useState<boolean>(true);

    const [selectedModule, setSelectedModule] = useState<ToggleButtonOption>(moduleOptions[0]);

    const [tasks, setTasks] = useState<TaskDto[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async(): Promise<void> => {
        setIsLoading(true);

        getUser();
        await Promise.all([ getTasks() ]);

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
            userId: user.userId,
            active: true
        };

        const tasks: TaskDto[] = await tasksService.getTasks(filter);

        setTasks(tasks);
    }

    const toggleShowingTodayTasks = () => setShowingTodayTasks(prevValue => !prevValue);

    const toggleShowingNotesAndDraws = () => setShowingNotesAndDraws(prevValue => !prevValue);

    return (
        <div className="pt-5 flex flex-col bg-[var(--secondary)] h-[100dvh] overflow-y-scroll">
              <div className="grid grid-cols-3 gap-10 p-10 w-full">
                {routes.map(
                    (appRoute: AppRoute, index: number) => <MenuItem key={index} {...appRoute}/>
                )}
            </div>
            <div className="relative mb-10">
                <div 
                    onClick={toggleShowingTodayTasks} 
                    className="relative font-bold text-[var(--secondary)] cursor-pointer -mb-5 ml-10 p-2 border-blue-400 border-2 rounded-md bg-blue-400 z-30 whitespace-nowrap w-[min-content]"
                >
                    Tareas de Hoy
                </div>
                <div className="absolute border-t-2 border-blue-400 mb-20 w-full z-0"/>
                <SlideDown>
                    {showingTodayTasks === true && 
                        <div className="relative bg-white p-10 flex flex-row z-10 border-blue-400 border-t-2 border-b-2 overflow-x-scroll hidden-scrollbar">
                            {tasks.map(
                                (task: TaskDto, index: number) => <NowTaskItem key={index} {...task} />
                            )}
                        </div>
                    }
                </SlideDown>
            </div>
            <div className="relative mb-10">
                <ToggleButton
                    className={`relative w-[10rem] cursor-pointer -mb-5 ml-10 p-2 border-${selectedModule.color} border-2 rounded-md bg-white text-white z-30 whitespace-nowrap`}
                    options={moduleOptions}
                    setSelectedOption={setSelectedModule}
                    onClick={toggleShowingNotesAndDraws}
                />
                <div className={`absolute border-t-2 border-${selectedModule.color} mb-20 w-full z-0`}/>
                <SlideDown>
                    {showingNotesAndDraws === true && 
                        <div className={`relative bg-white p-10 flex flex-row z-10 border-${selectedModule.color} border-t-2 border-b-2 overflow-x-scroll hidden-scrollbar`}>
                            
                        </div>
                    }
                </SlideDown>
            </div>
        </div>
    );
}

export default Home;