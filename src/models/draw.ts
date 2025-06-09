
export interface DrawDto {
    drawId: number;
    image: string;
    title: string;
    userId: string;
    userName: string;
    tag: string;
}

export interface DrawDao {
    drawId?: number;
    active?: boolean;
    image?: string;
    modificatedBy?: number;
    title?: string;
    userId?: number;
    tag?: string;
}

export interface DrawFilter {
    drawId?: number;
    active?: boolean;
    userId?: number;
    title?: string;
    tags?: string;
}