import ApiService from "@/core/services/api-service";
import { Execution, LoginExecution, LoginSession, SignupSession } from "@/models";
import { TaskDto, TaskFilter } from "@/models/task";


class TasksService {

    section: string = 'tasks/';
    apiService: ApiService;
    
    constructor() {
        this.apiService = new ApiService();
    }

    public getTasks = async(filter: TaskFilter): Promise<TaskDto[]> => {
        const tasks: TaskDto[] = await this.apiService.get(`${this.section}`);
        return tasks;
    }

}

export default TasksService;