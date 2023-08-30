import { fieldNameType } from "../types"

class Validation{
    constructor() {}
    public static validate(fieldName:fieldNameType,fieldValue:string){
        if (this[fieldName]) {
            return  this[fieldName](fieldValue)
        }
        throw new Error('such fieldname doesnt exist')
    }

    private static nickname(nickname:string):boolean{
        return nickname.length>=3
    }

    private static email(email:string):boolean{
        const pattern = /^[^@]+@[^@]+\.[^@]+$/;
        return pattern.test(email)
    }


    private static password(password:string):boolean{
        const pattern = /^.{6,}$/;
        return pattern.test(password)
    }
}




export default Validation