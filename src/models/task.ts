
export interface TaskDto {
    taskId: number;
    value: string;
    title: string;
    date: Date;
    userId: string;
    userName: string;
}

export interface TaskDao {
    taskId?: number;
    value?: string;
    modificatedBy: number;
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
}