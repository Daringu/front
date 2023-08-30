import $api from "../http";
import {IId, ITodo, ITodoResponse} from "@/models/response/TodoResponse";

export default class TodoService {
   static async deleteTodo(todo:ITodo):Promise<IId>{
       const response= await $api.delete<IId>('/todo',{data:{
           todo
           }})
       return response.data
   }
   static async updateTodo(todo:ITodo):Promise<ITodo>{
       const response=await $api.patch<ITodo>('/todo',{
           todo
       })
       return response.data
   }

   static async addTodo(todo:ITodo):Promise<ITodo>{
       const response=await $api.post('/todo',{
           todo
       })
       return response.data
   }

   static async getTodos():Promise<ITodo[]>{
       const response=await $api.get('/todo')
       return response.data
   }
}