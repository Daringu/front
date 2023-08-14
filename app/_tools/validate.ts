import { fieldNameType } from "../_types"

class Validation{
    constructor(){

    }
    
    public static validate(fieldName:fieldNameType,fieldValue:string){
        if (this[fieldName]) {
            return  this[fieldName](fieldValue)
        }
        throw new Error('such fieldname doesnt exist')
    }

    private static nickname(nickname:string):boolean{
        if (nickname.length<=3) {
            return false
        }
        return true
    }

    private static email(email:string):boolean{
        const pattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!pattern.test(email)) {
            return false
        }

        return true
    }


    private static password(password:string):boolean{
        const pattern = /^.{6,}$/;
        if (!pattern.test(password)) {
            return false
        }
        return true
    }
}




export default Validation