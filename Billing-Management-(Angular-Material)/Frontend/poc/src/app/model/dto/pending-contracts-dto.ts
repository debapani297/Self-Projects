export class PendingContractsDto {
    constructor(public contractId:number,
        public companyVendor:string,
        public companyClient:string,
        public amount:number,
        public contractRaisedBy:string,
        public fromDate:Date,
        public toDate:Date,
        public status:string,
        public balance:number  ){} 
}
