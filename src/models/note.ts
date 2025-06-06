
export interface NoteDto {
    noteId: number;
    description: string;
    title: string;
    userId: string;
    userName: string;
}

export interface NoteDao {
    noteId?: number;
    active?: boolean;
    description?: string;
    modificatedBy?: number;
    title?: string;
    userId?: number;
}

export interface NoteFilter {
    noteId?: number;
    active?: boolean;
    userId?: number;
    title?: string;
}