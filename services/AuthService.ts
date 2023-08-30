import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "@/models/response/AuthResponse";


export default class AuthService{
    static async login(username:string,password:string):Promise<AxiosResponse<AuthResponse>>{
        try {
           return await $api.post<AuthResponse>('/login',{username,password})
        } catch (error) {
            return Promise.reject(error)  
        }
    }

    static async registrate(username:string,password:string,email:string):Promise<AxiosResponse<AuthResponse>>{
        try {
            return await $api.post<AuthResponse>('/registrate',{username,password,email})
        } catch (error) {
            return Promise.reject(error) 
        }
        
    }

    static async logout():Promise<void>{
        try {
            await $api.post<AuthResponse>('/logout')
        } catch (error) {
            return Promise.reject(error)    
        }
    }
}