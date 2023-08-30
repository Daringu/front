import { makeAutoObservable } from "mobx";
import { IUser } from "@/models/response/IUser";
import AuthService from "@/services/AuthService";
import axios from "axios";
import { AuthResponse } from "@/models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store{
    user={} as IUser;
    isAuth=false;
    isLoading=false;
    constructor(){
        makeAutoObservable(this);
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
            localStorage.setItem('token',response.data.accessToken)
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
            localStorage.setItem('token',response.data.accessToken)
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
            localStorage.removeItem('token')
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
            const response=await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials:true})
            localStorage.setItem('token',response.data.accessToken)
            this.setAuth(true);
            this.setUser(response.data.user)
        } catch (error) {
            return Promise.reject(error)
        }finally{
            this.setLoading(false)
        }
    }
}