import { Message, TeamCreateResponse } from "@/interfaces";

export interface IUser{
        email:string;
        id:string;
        isActivated:boolean;
        username:string;
        roles:string[];
        messages:Message[];
        teams:TeamCreateResponse[];
}