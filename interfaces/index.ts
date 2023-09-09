import {ITodo, statusType} from "@/models/response/TodoResponse";
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
}

export interface IBoardItem{
    dragStartHandler:(e:React.DragEvent<HTMLDivElement>,todo:ITodo,type: statusType)=>void;
    dragEndHandler : (e: React.DragEvent<HTMLDivElement>) =>void;
    draggable:boolean;
}
