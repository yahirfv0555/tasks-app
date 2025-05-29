
export interface AppRoute {
    name: string;
    route: string;
    routes?: AppRoute[];
}

export interface HttpHeaders {
    'Content-Type': 'application/json'
    'Authorization'?: string;
}

export interface Execution {
    successful: boolean;
    message: string;
    id?: number;
}

export interface LoginExecution extends Execution {
    user?: any;
    jwt?: string;
}