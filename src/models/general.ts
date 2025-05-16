
export interface AppRoute {
    name: string;
    route: string;
    routes?: AppRoute[];
}

export interface HttpHeaders {
    'Content-Type': 'application/json'
    'Authentication'?: string;
}

export interface Execution {
    successful: boolean;
    message: string;
    id?: number;
}

export interface LoginExecution extends Execution {
    User?: any;
    Jwt?: string;
}