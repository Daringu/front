import {makeAutoObservable} from "mobx";
import {ITodo} from "@/models/response/TodoResponse";
import TodoService from "@/services/TodoService";

export default class TodoStore{
    todos=[] as ITodo[];
    isLoading=false;
    isCreateTodoOpen=false;
    constructor() {
        makeAutoObservable(this)
    }

    async addTodo(todo:ITodo){
        this.setLoading(true)
        try {
            const todoResponse=await TodoService.addTodo(todo);
            this.todos=[...this.todos,todoResponse]
            
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }

    async deleteTodo(todo:ITodo){
        this.setLoading(true)
        try {
            const todoResponse=await TodoService.deleteTodo(todo);
            this.todos=[...this.todos.filter(e=>e.id!==todoResponse.id)]
        }catch (e) {
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }

    async updateTodo(todo:ITodo){
        this.setLoading(true)
        try {
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
            const todos=await TodoService.getTodos();
            this.todos=[...todos];
            
        }catch (e) {
            console.log(e)
        }finally {
            this.setLoading(false)
        }
    }
    setCreateTodoOpen(){
        this.isCreateTodoOpen=!this.isCreateTodoOpen
    }
    setLoading(bool:boolean){
        this.isLoading=bool;
    }

}