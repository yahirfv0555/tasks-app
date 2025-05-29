
export interface UserDto {
    userId?: number;
    name?: string;
    email?: string;
}

export interface UserDao {
    userId?: number;
    name?: string;
    modificatedBy?: number;
    email?: string;
}

export interface SignupSession {
    code: string;
    password: string;
    user: UserDao
}

export interface LoginSession {
    email: string;
    password: string;
}