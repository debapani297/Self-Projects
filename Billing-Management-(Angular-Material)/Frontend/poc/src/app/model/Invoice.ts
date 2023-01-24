import { ContractModel } from "./contract-model";
import { Company } from "./Company";
import { CompanyUser } from "./CompanyUser";

export class Invoice {
    constructor(
        public  invoiceId:number,
        public  companyVendor:Company,
        public  companyClient:Company,
        public  invoiceRaisedBy:CompanyUser,
        public  approvedByClientProgramManager:CompanyUser,
        public  approvedByClientContractManager:CompanyUser,
        public  creationDate:Date,
        public  dueDate:Date,
       
        public  status:string,
        public  amount:number,
        
      
        public  contract:ContractModel



    ){

    }
}
