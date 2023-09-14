import { IUser } from "@/models/response/IUser";
import {ITodo, statusType} from "@/models/response/TodoResponse";
import BoardStore from "@/stores/BoardStore";
import TodoStore from "@/stores/TodoStore";

export interface IFormState {
    nickname: {
        value: string,
        isValid: boolean
    },
    email: {
        value: string,
        isValid: boolean
    },
    password: {
        value: string,
        isValid: boolean
    },
}

export interface IDragHandlers{
    dragOverHandler:(e:React.DragEvent<HTMLDivElement>,type: statusType)=>void;
    dragLeaveHandler:(e:React.DragEvent<HTMLDivElement>)=>void;
    dragStartHandler:(e:React.DragEvent<HTMLDivElement>,todo:ITodo,type: statusType)=>void;
    dragEndHandler : (e: React.DragEvent<HTMLDivElement>) =>void;
}

export interface Board extends IDragHandlers{
    items:ITodo[];
    type:statusType;
    isDraggable:boolean;
    currentBoard:statusType;
    currentItem:ITodo;
    todoStore:TodoStore;
    boardStore:BoardStore;
}

export interface IBoardItem{
    dragStartHandler:(e:React.DragEvent<HTMLDivElement>,todo:ITodo,type: statusType)=>void;
    dragEndHandler : (e: React.DragEvent<HTMLDivElement>) =>void;
    draggable:boolean;
}

export interface Message{
    id:string;
    text:string;
    messageType:'invitation'|'text';
    messageAttachment?:string;
    seen:boolean;
}

type mode='single'|'team';

export interface ITeam{
    id:string;
    teamTodos:ITodo[];
    createdBy:string;
    teamName:string;
    users:IUser[];
}
export interface TeamCreateResponse{
    teamName:string;
    teamId:string;
}