export class ContractDetailsdto {
    constructor(
        public companyVendorId:string,
        public companyClientId:string,
        public contractApprovedById:string,
        public contractRaisedById:string,
        public status:string,
        public amount:number,
        // public fromDate:Date,
        // public toDate:Date
        public fromDate:string,
    public toDate:string,
    ){

    }
}
