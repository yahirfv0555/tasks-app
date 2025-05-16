import apiUrl from '../config/api';
import Auth from '../middleware/auth';
import { Execution, HttpHeaders, LoginExecution } from "@/models/general";

class ApiService {

    private headers: HttpHeaders;
    private auth: Auth;

    constructor () {

        this.headers = {
            'Content-Type': 'application/json'
        };

        this.auth = new Auth();

        this.auth.assignScoredJwt(this.headers);
    }

    public async get<T>(endpoint: string): Promise<T[]> {
        try {

            const response = await fetch(
                `${apiUrl}${endpoint}`, 
                {
                    method: 'GET',
                    headers: this.headers as any,
                }
            );

            if (response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Error desconocido del servidor');
            }

            const data: T[] = await response.json();

            return data;

        } catch(error) {
            
            return [];
        }
    }

    public async post(body: unknown, endpoint: string): Promise<Execution | LoginExecution> {
        try {

            const response = await fetch(
                `${apiUrl}${endpoint}`, 
                {
                    method: 'POST',
                    headers: this.headers as any,
                    body: JSON.stringify(body)
                }
            );

            if (response.ok) {
                return {
                    message: 'Ocurrió  un error inesperado',
                    successful: false
                }
            }

            const data: Execution | LoginExecution = await response.json();

            return data;

        } catch(error) {
            return {
                successful: false,
                message: (error as Error).message
            };
        }
    }

    public async put(body: unknown, endpoint: string): Promise<Execution | LoginExecution> {
        try {

            const response = await fetch(
                `${apiUrl}${endpoint}`, 
                {
                    method: 'PUT',
                    headers: this.headers as any,
                    body: JSON.stringify(body)
                }
            );

            if (response.ok) {
                return {
                    message: 'Ocurrió  un error inesperado',
                    successful: false
                }
            }

            const data: Execution | LoginExecution = await response.json();

            return data;

        } catch(error) {
            return {
                successful: false,
                message: (error as Error).message
            };
        }
    }

}

export default ApiService;

