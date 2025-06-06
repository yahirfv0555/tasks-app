
export interface NoteDto {
    noteId: number;
    description: string;
    title: string;
    userId: string;
    userName: string;
    tag: string;
}

export interface TagDto {
    tag: string;
}

export interface NoteDao {
    noteId?: number;
    active?: boolean;
    description?: string;
    modificatedBy?: number;
    title?: string;
    userId?: number;
    tag?: string;
}

export interface NoteFilter {
    noteId?: number;
    active?: boolean;
    userId?: number;
    title?: string;
    tags?: string;
}

export interface TagFilter {
    userId?: number;
    tags?: string;
}