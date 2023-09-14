'use client'
import { makeAutoObservable } from "mobx";
import { IUser } from "@/models/response/IUser";
import AuthService from "@/services/AuthService";
import axios from "axios";
import { AuthResponse } from "@/models/response/AuthResponse";
import $api, { API_URL } from "../http";
import Cookies from "js-cookie";
import { Message } from "@/interfaces";
import { TeamTodoService } from "@/services/TodoService";
import { ioServer } from "@/ioServer";
import { toast } from "react-toastify";

export default class Store{
    user={} as IUser;
    isAuth=false;
    isLoading=false;
    hasConnected=false;
    constructor (){
        makeAutoObservable(this);
        
        this.connect()
    }
    async connect(){
       
        ioServer.on('message',(message:Message)=>{
            this.user.messages=[...this.user.messages,message]
            toast.info('you have a new message')
        })
        ioServer.on('error',({message})=>{
            toast.error(message)
        })
    }
    setAuth(bool:boolean){
        this.isAuth=bool;
    }

    setUser(user:IUser){
        this.user=user;
    }

    async login(username:string,password:string){
        this.setLoading(true)
        try {
            const response=await AuthService.login(username,password)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            this.setUser(response.data.user)
            this.setAuth(true)
        } catch (error:any) {
            return Promise.reject(error) 
        }finally{
            this.setLoading(false)
        }  
    }

    async registrate(username:string,password:string,email:string){
        this.setLoading(true)
        try {
            const response=await AuthService.registrate(username,password,email)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            this.setUser(response.data.user)
            this.setAuth(true)
        } catch (error:any) {
            return Promise.reject(error) 
        }finally{
            this.setLoading(false)
        }
    }

    async logout(){
        this.setLoading(true)
        try {
            const response=await AuthService.logout()
            Cookies.remove('token')
            localStorage.removeItem('user')
            this.setUser({} as IUser)
            this.setAuth(false)
        } catch (error:any) {
            return Promise.reject(error) 
        }finally{
            this.setLoading(false)
        }  
    }

    setLoading(bool:boolean){
        this.isLoading=bool
    }

    async checkAuth(){
        this.setLoading(true)
        try {
            const response=await $api.post<AuthResponse>(`/refresh`,{withCredentials:true})
            this.setAuth(true);
            this.setUser(response.data.user)
            if (this.hasConnected) {
                return;
            }
            ioServer.emit('join-user-room', this.user.id)
        } catch (error) {
            return toast.error(error as string)
        }finally{
            this.setLoading(false)
        }
    }
    async createTeam(teamName:string){
        try {
            const response=await TeamTodoService.createTeam(teamName)
            toast.success('you have created a team')
            this.user.teams.push(response)
        } catch (error) {
            return toast.error(error as string)
        }
    }
    async deleteTeam(teamId:string){
        try {
            const response=await TeamTodoService.deleteTeam(teamId)
            toast.success('you have deleted a team')
            this.user.teams=this.user.teams.filter(team=>team.teamId!==teamId)
        } catch (error) {
            return toast.error(error as string)
        }
    }
}