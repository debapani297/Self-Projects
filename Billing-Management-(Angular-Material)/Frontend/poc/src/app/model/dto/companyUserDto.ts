export class CompanyUserDto{
    constructor(public userName:string,
                public name:string,
                public password:string,
                public companyId:number,
                public roleId:number){}
}