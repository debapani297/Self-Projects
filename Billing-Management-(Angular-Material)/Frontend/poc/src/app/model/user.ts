import { Role } from "./role";



    export class User {
        constructor(
            public userId:number,
            public userName:string,
          
            public password:string,
           
            public roles:Role,
            public status:string
    
        ){
    
        }
    }
    
