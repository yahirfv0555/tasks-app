import Auth from "@/core/middleware/auth";
import ApiService from "@/core/services/api-service";
import { Execution, LoginExecution, LoginSession, SignupSession } from "@/models";
import { TaskDao, TaskDto, TaskFilter } from "@/models/task";
import { cleanBooleanParam, cleanDateParam, cleanParam } from "@/shared/functions/cleanParams";

const auth: Auth = new Auth();

class TasksService {

    private section: string = 'tasks/';
    private apiService: ApiService;
    
    constructor() {
        this.apiService = new ApiService();
    }

    public getTasks = async(filter: TaskFilter): Promise<TaskDto[]> => {
        const tasks: TaskDto[] = await this.apiService.get(`${this.section}
            ?userId=${cleanParam(filter.userId)}
            &title=${cleanParam(filter.title)}
            &active=${cleanBooleanParam(filter.active)}
            &date=${cleanDateParam(filter.date)}
            &fromDate=${cleanDateParam(filter.fromDate)}
        `);
        return tasks;
    }

    public createTask = async(task: TaskDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.post(task, `${this.section}`);
        return execution;
    }

    public updateTask = async(task: TaskDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.put(task, `${this.section}`);
        return execution;
    }

    public deleteTask = async(filter: TaskFilter): Promise<Execution> => {
        const execution: Execution = await this.apiService.delete(filter, `${this.section}`);
        return execution;
    }

}

export default TasksService;