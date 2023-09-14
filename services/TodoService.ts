import { ITeam, TeamCreateResponse } from "@/interfaces";
import $api from "../http";
import {IId, ITodo} from "@/models/response/TodoResponse";

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

export class TeamTodoService{
    static async getTeam(teamId:string):Promise<ITeam>{
        console.log(teamId);
        
        const response=await $api.get(`/team/${teamId}`)
        return response.data
    }
    static async createTeam(teamName:string):Promise<TeamCreateResponse>{
        const response=await $api.post('/team/create',{
           teamName
        })
        return response.data
    }
    static async deleteTeam(teamId:string):Promise<void>{
        const response=await $api.delete('/team/delete',{data:{
            teamId
        }})
    }
}