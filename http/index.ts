import axios from "axios";
import { AuthResponse } from "@/models/response/AuthResponse";
import Cookies from 'js-cookie'

export const URL='https://todosapp-3bnd.onrender.com'
export const URLWS='https://todosapp-3bnd.onrender.com'


export const API_URL=URL+'/api'

const $api=axios.create({
    withCredentials:true,
    baseURL:API_URL,
    headers:{
        'Access-Control-Allow-Origin':URL,
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers':'Content-Type, Authorization, Content-Length, X-Requested-With, Accept',
        'Access-Control-Allow-Credentials':true,
    }
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${Cookies.get('token')}`
    return config;
})

$api.interceptors.response.use((config)=>{
    return config
},async(error)=>{
    const originalRequest=error.config;    
    if (error.response?.status===401&&error.config&&!error.config._isRetry) {
        originalRequest._isRetry=true;
        try {
            const response=await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials:true})
            localStorage.setItem('token',response.data.accessToken)
            return $api.request(originalRequest);
        } catch (error) {
            return Promise.reject('Unauthorized')
        } 
    }
    return Promise.reject(error.response?.data?.message) 
})
export default $api
