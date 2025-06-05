
export interface TaskDto {
    taskId: number;
    description: string;
    title: string;
    date: Date;
    userId: string;
    userName: string;
}

export interface TaskDao {
    taskId?: number;
    active?: boolean;
    description?: string;
    modificatedBy?: number;
    title?: string;
    date?: Date;
    userId?: number;
}

export interface TaskFilter {
    taskId?: number;
    active?: boolean;
    date?: Date;
    fromDate?: Date;
    userId?: number;
    title?: string;
}