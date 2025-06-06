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
import { ToggleButtonOption } from "@/shared/components/toggle-button";

const auth: Auth = new Auth();
const tasksService: TasksService = new TasksService();

let user: UserDto = {};

const moduleOptions: ToggleButtonOption[] = [
    {
        name: 'Notas',
        color: '#fb923c'
    },
    {
        name: 'Dibujos',
        color: '#c084fc'
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
        <div className="flex flex-col bg-gray-100 h-[100dvh] overflow-y-scroll">
             <div className="relative mt-5 mb-10">
                <div 
                    onClick={toggleShowingTodayTasks} 
                    className="relative font-bold text-white cursor-pointer -mb-5 ml-30 p-2 border-blue-400 border-2 rounded-md bg-blue-400 z-30 whitespace-nowrap w-[min-content]"
                >
                    Tareas de Hoy
                </div>
                <div className="absolute border-t-2 border-white mb-20 w-full z-0"/>
                <SlideDown>
                    {showingTodayTasks === true && 
                        <div className="relative bg-white py-7 px-30 flex flex-row z-10 border-white border-t-2 border-b-2 overflow-x-scroll hidden-scrollbar">
                            {tasks.map(
                                (task: TaskDto, index: number) => <NowTaskItem key={index} {...task} />
                            )}
                        </div>
                    }
                </SlideDown>
            </div>

            <div className="bg-white rounded-t-2xl mx-10 px-20 py-10 h-full">
                <div className="grid grid-cols-3 gap-10 w-full">
                    {routes.map(
                        (appRoute: AppRoute, index: number) => <MenuItem key={index} {...appRoute}/>
                    )}
                </div>
            
                {/* <div className="relative mb-10">
                    <ToggleButton
                        className={`relative w-[10rem] cursor-pointer -mb-5 ml-30 p-2 border-2 rounded-md text-white z-30 whitespace-nowrap`}
                        style={{ borderColor: selectedModule.color }}
                        options={moduleOptions}
                        setSelectedOption={setSelectedModule}
                        onClick={toggleShowingNotesAndDraws}
                    />
                    <div 
                        className={`absolute border-t-2 border-[${selectedModule.color}] mb-20 w-full z-0`}
                        style={{ borderColor: selectedModule.color }}
                    />
                    <SlideDown>
                        {showingNotesAndDraws === true && 
                            <div 
                                className={`relative bg-white py-10 px-30 flex flex-row z-10 border-t-2 border-b-2 overflow-x-scroll hidden-scrollbar`}
                                style={{ borderColor: selectedModule.color }}
                            >
                                
                            </div>
                        }
                    </SlideDown>
                </div> */}
            </div>

        </div>
    );
}

export default Home;