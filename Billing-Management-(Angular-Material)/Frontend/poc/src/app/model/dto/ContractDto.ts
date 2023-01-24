export class ContractDto{
    constructor(public companyVendorId:number,
        public companyClientId:number,
        public  contractRaisedById:number,
        public contractApprovedById:number,
        public  status:string,
        public  amount:number,
        public  fromDate:Date,
        public  toDate:Date
    
    
    ){}
}