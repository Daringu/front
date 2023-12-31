export type statusType='active'|'inprocess'|'completed'|'cancelled'

export const availableStatuses:statusType[]=['active','inprocess','completed','cancelled'];

export interface ITodo{
    status:statusType;
    text:string;
    userId?:string;
    id?:string;
    createdBy?:string;
    takenBy?:string;
    createdAt?:string;
    updatedAt?:string;
}

export interface ITodoResponse{
    todo:ITodo
}

export interface IId{
    id:string;
}