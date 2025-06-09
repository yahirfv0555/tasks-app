import Auth from "@/core/middleware/auth";
import ApiService from "@/core/services/api-service";
import { Execution, DrawDao, DrawDto, DrawFilter, TagDto, TagFilter } from "@/models";
import { cleanBooleanParam, cleanParam } from "@/shared/functions/cleanParams";

const auth: Auth = new Auth();

class DrawsService {

    private section: string = 'draws/';
    private apiService: ApiService;
    
    constructor() {
        this.apiService = new ApiService();
    }

    public getDraws = async(filter: DrawFilter): Promise<DrawDto[]> => {
        const tasks: DrawDto[] = await this.apiService.get(`${this.section}
            ?userId=${cleanParam(filter.userId)}
            &title=${cleanParam(filter.title)}
            &active=${cleanBooleanParam(filter.active)}
            &tags=${cleanParam(filter.tags)}
        `);
        return tasks;
    }

    public getTags = async(filter: TagFilter): Promise<TagDto[]> => {
        const tasks: DrawDto[] = await this.apiService.get(`${this.section}tags/
            ?userId=${cleanParam(filter.userId)}
            &tags=${cleanParam(filter.tags)}
        `);
        return tasks;
    }

    public createDraw = async(task: DrawDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.post(task, `${this.section}`);
        return execution;
    }

    public updateDraw = async(task: DrawDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.put(task, `${this.section}`);
        return execution;
    }

    public deleteDraw = async(filter: DrawFilter): Promise<Execution> => {
        const execution: Execution = await this.apiService.delete(filter, `${this.section}`);
        return execution;
    }

}

export default DrawsService;