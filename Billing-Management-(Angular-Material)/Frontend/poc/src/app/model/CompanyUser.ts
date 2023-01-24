import { Company } from "./Company";
import { Role } from "./role";
import { User } from "./user";

export class CompanyUser extends User {
    constructor(userId:number,
        userName:string,
        password:string,
        roles:Role,
        public name:string,
         status:string,
        public company:Company){

        super(userId,userName,password,roles,status);
    }
}
