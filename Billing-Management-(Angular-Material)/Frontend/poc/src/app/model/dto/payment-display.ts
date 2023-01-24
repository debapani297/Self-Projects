export class PaymentDisplay {
    constructor(
        public  paymentId:number,
	public  dueDate:Date,
	public  paidByAccountPayable:string,
	public  status:string,
	public  vendor:string,
	public  client:string,
	public  amount:number,
	public  invoiceId:number,
	public  contractId:number
    ){

    }
}
