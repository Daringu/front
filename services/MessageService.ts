import $api from "@/http";
import { TeamCreateResponse } from "@/interfaces";


interface response{
    messageId:string,
    responseMessage:string;
    team?:TeamCreateResponse;
    status:number;
}

export class MessageService {
    static async acceptInvitation({teamId,messageId}:{teamId:string|undefined,messageId:string}):Promise<response>{
        try {
            const response=await $api.put<response>('/message/accept/',{teamId,messageId})
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
    static async declineInvitation({teamId,messageId}:{teamId:string|undefined,messageId:string}):Promise<response>{
        try {
            const response=await $api.put<response>('/message/decline/',{teamId,messageId})
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }
    // static async deleteMessage({messageId}:{messageId:string}):Promise<response>{
    //     try {
    //         const response=await $api.delete<response>('/message/delete/',{messageId})
    //         return response.data
    //     } catch (error) {
    //         return Promise.reject(error)
    //     }
    // }
}