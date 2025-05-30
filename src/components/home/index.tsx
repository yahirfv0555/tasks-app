import { AppRoute } from "@/models/general";
import routes from "@/core/config/routes";
import MenuItem from "./menu-item";
import Auth from "@/core/middleware/auth";
import { useEffect, useState } from "react";
import { TaskDto, TaskFilter } from "@/models/task";
import TasksService from "@/services/tasks/tasks-service";
import NowTaskItem from "./now-task-item";
import { useLoaderProvider } from "@/providers/loader/loader-provider";

const auth: Auth = new Auth();
const tasksService: TasksService = new TasksService();

const Home: React.FC = () => {
    const { setIsLoading } = useLoaderProvider();

    const [tasks, setTasks] = useState<TaskDto[]>([]);

    const getTasks = async () => {

        const taskFilter: TaskFilter = {
            userId: 0
        };

        const tasks: TaskDto[] = await tasksService.getTasks(taskFilter);

        setTasks(tasks);
    }

    const getData = async() => {
        setIsLoading(true);

        await Promise.all([ getTasks() ]);

        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex flex-col">
            <div>
                {
                    tasks.map((task: TaskDto, index: number) => (
                        <NowTaskItem {...task} />
                    ))
                }
            </div>
            <div className="grid grid-cols-3 gap-10 p-10 w-full">
                {
                    routes.map((appRoute: AppRoute, index: number) => (
                        <MenuItem
                            key={index}
                            route={appRoute.route}
                            name={appRoute.name}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Home;