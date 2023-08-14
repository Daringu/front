import { AxiosResponse } from "axios";
import $api from "../_http";
import { IUser } from "../_models/response/IUser";

export default class UserService {
   static fetchUsers():Promise<AxiosResponse<IUser[]>>{
    return $api.get<IUser[]>('/users')
   }
}