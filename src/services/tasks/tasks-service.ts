import Auth from "@/core/middleware/auth";
import ApiService from "@/core/services/api-service";
import { Execution, LoginExecution, LoginSession, SignupSession } from "@/models";
import { TaskDao, TaskDto, TaskFilter } from "@/models/task";

const auth: Auth = new Auth();

class TasksService {

    private section: string = 'tasks/';
    private apiService: ApiService;
    
    constructor() {
        this.apiService = new ApiService();
    }

    public getTasks = async(filter: TaskFilter): Promise<TaskDto[]> => {
        const tasks: TaskDto[] = await this.apiService.get(`${this.section}?userId=${filter.userId}`);
        return tasks;
    }

    public createTask = async(taskDao: TaskDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.post(taskDao, `${this.section}`);
        return execution;
    }

    public updateTask = async(taskDao: TaskDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.put(taskDao, `${this.section}`);
        return execution;
    }

}

export default TasksService;