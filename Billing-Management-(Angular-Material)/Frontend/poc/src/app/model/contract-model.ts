import { Company } from "./Company"
import { CompanyUser } from "./CompanyUser"

export class ContractModel {
   constructor(public contractId:number,
    public companyVendor:Company,
    public companyClient:Company,
    public contractRaisedby:CompanyUser,
    public contractApprovedBy:CompanyUser,
    public fromDate:Date,
    public toDate:Date,
    // public fromDate:string,
    // public toDate:string,
    public status:string,
    public amount:number){} 
}
