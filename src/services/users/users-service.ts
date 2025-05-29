import ApiService from "@/core/services/api-service";
import { Execution, LoginExecution, LoginSession, SignupSession } from "@/models";


class UsersService {

    section: string = 'users/';
    apiService: ApiService;
    
    constructor() {
        this.apiService = new ApiService();
    }

    public login = async(loginSession: LoginSession): Promise<LoginExecution> => {
        const execution: LoginExecution = await this.apiService.post(loginSession, `${this.section}login`);
        return execution;
    }

    public signup = async(signupSession: SignupSession): Promise<LoginExecution> => {
        const execution: LoginExecution = await this.apiService.post(signupSession, `${this.section}signup`)
        return execution;
    }
}

export default UsersService;