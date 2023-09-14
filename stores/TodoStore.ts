'use client'

import {makeAutoObservable} from "mobx";
import {ITodo} from "@/models/response/TodoResponse";
import TodoService, { TeamTodoService } from "@/services/TodoService";
import { ITeam } from "@/interfaces";
import { ioServer } from "@/ioServer";


export default class TodoStore{
  todos=[] as ITodo[];
    isLoading=false;
    isCreateTodoOpen=false;
    boardType='single'
    mode:string;
    id?:string;
    team?:ITeam;
    userId?:string;
    constructor(mode:'single'|'team',id?:string) {

        makeAutoObservable(this)
        if (typeof window !== 'undefined') {
            this.userId=JSON.parse(localStorage.getItem('user')!).id
        }
        this.mode=mode;
        this.id=id;
        if (mode==='team') {
            this.regiserListeners();
        }
    }
    regiserListeners(){
        ioServer.emit('join-team',{teamId:this.id,userId:this.userId});
        ioServer.on('added-todo',(todo:ITodo)=>{
            
            this.todos=[...this.todos,todo];
        })
        ioServer.on('updated-todo',(todo:ITodo)=>{
            
           this.updateTodoInArr(todo)
           
        })
        ioServer.on('deleted-todo',(id)=>{
            
            this.todos=[...this.todos.filter(e=>e.id!==id)]
        })
    }

    updateTodoInArr(todo:ITodo){
        this.todos=this.todos.map(e=>e.id===todo.id?todo:e);
    }

    sendInvitation(target:string){
        ioServer.emit('send-invitation',{teamId:this.id,userId:this.userId,target})
    }

    async addTodo(todo:ITodo|ITodo){
       
        this.setLoading(true)
        try {
            if (this.mode==='team') {
                ioServer.emit('add-todo',{
                    teamId:this.id,
                    teamTodo:todo,
                    userId:this.userId
                });
                return;
            }
            const todoResponse=await TodoService.addTodo(todo);
            this.todos=[...this.todos,todoResponse]
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }

    async deleteTodo(todo:ITodo|ITodo){
        this.setLoading(true)
        try {
            if (this.mode==='team') {
                ioServer.emit('delete-todo',{teamTodoId:todo.id,teamId:this.id,userId:this.userId})
                return;
            }
            const todoResponse=await TodoService.deleteTodo(todo);
            this.todos=[...this.todos.filter(e=>e.id!==todoResponse.id)]
        }catch (e) {
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }

    async updateTodo(todo:ITodo|ITodo){
       
        this.setLoading(true)
        try {
            if (this.mode==='team') {
                ioServer.emit('update-todo',{teamTodo:todo,teamId:this.id,userId:this.userId})
            return;
            }
            const todoResponse=await TodoService.updateTodo(todo);
            this.todos=[...this.todos.map(e=>e.id===todoResponse.id?todoResponse:e)];
            
        }catch (e) {
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }
    async getTodos(){
        this.setLoading(true)
        try {
            if (this.mode==='team') {
                
                const team=await TeamTodoService.getTeam(this.id!);
                this.todos=[...team.teamTodos];
                this.team=team;
                return;
            }
            const todos=await TodoService.getTodos(); 
            this.todos=[...todos];
            
        }catch (e) {
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }
    setLoading(bool:boolean){
        this.isLoading=bool;
    }
}