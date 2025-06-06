import Auth from "@/core/middleware/auth";
import ApiService from "@/core/services/api-service";
import { Execution } from "@/models";
import { NoteDao, NoteDto, NoteFilter, TagDto, TagFilter } from "@/models/note";
import { cleanBooleanParam, cleanParam } from "@/shared/functions/cleanParams";

const auth: Auth = new Auth();

class NotesService {

    private section: string = 'notes/';
    private apiService: ApiService;
    
    constructor() {
        this.apiService = new ApiService();
    }

    public getNotes = async(filter: NoteFilter): Promise<NoteDto[]> => {
        const tasks: NoteDto[] = await this.apiService.get(`${this.section}
            ?userId=${cleanParam(filter.userId)}
            &title=${cleanParam(filter.title)}
            &active=${cleanBooleanParam(filter.active)}
            &tags=${cleanParam(filter.tags)}
        `);
        return tasks;
    }

    public getTags = async(filter: TagFilter): Promise<TagDto[]> => {
        const tasks: NoteDto[] = await this.apiService.get(`${this.section}tags/
            ?userId=${cleanParam(filter.userId)}
            &tags=${cleanParam(filter.tags)}
        `);
        return tasks;
    }

    public createNote = async(task: NoteDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.post(task, `${this.section}`);
        return execution;
    }

    public updateNote = async(task: NoteDao): Promise<Execution> => {
        const execution: Execution = await this.apiService.put(task, `${this.section}`);
        return execution;
    }

    public deleteNote = async(filter: NoteFilter): Promise<Execution> => {
        const execution: Execution = await this.apiService.delete(filter, `${this.section}`);
        return execution;
    }

}

export default NotesService;