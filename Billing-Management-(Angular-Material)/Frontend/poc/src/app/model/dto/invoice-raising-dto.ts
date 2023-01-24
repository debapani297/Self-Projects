export class InvoiceRaisingDto {
    constructor(public contractId:number,
        public  companyVendor:number,
        public companyClient:number,
        public contractRaisedby:number,
        public contractApprovedByCPM:number,
        public contractApprovedByCCM:number,
        public fromDate:Date,//invoice Creation date
        public toDate:Date,//invoice Due Date
        public amount:number,
        public status:string){

    }
}
