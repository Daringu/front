import { statusType } from "@/models/response/TodoResponse";
import { makeAutoObservable } from "mobx";
import { ITodo } from "@/models/response/TodoResponse";

class BoardStore{
    initBoard = '' as statusType;
    currentBoard= '' as statusType;
    currentItem = {} as ITodo;
    isDraggable = true;

    constructor(){
        makeAutoObservable(this);
    }

    setInitBoard = (type:statusType) =>{
        this.initBoard = type;
    };

    setCurrentBoard = (type:statusType) =>{
        this.currentBoard = type;
    };

    setCurrentItem = (item:ITodo) =>{
        this.currentItem = item;
    };

    setIsDraggable = (isDraggable:boolean) =>{
        this.isDraggable = isDraggable;
    };
    discard(){
        this.initBoard = '' as statusType;
        this.currentBoard = '' as statusType;
        this.currentItem = {} as ITodo;
        this.isDraggable = true;
    }
}

export default BoardStore;