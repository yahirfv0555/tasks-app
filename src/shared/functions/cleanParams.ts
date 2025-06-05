
export const cleanParam = (param?: string | number): string => {
    return param !== undefined ? param.toString() : '';
}

export const cleanBooleanParam = (param?: boolean): string => {
    return param !== undefined ? (param === true ? 'true' : 'false') : '';
}

export const cleanDateParam = (param?: Date): string => {
    return param !== undefined && param.toString() !== '' ? param.toISOString() : '';
}