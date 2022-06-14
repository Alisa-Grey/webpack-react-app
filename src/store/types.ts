export interface ILoan {
  id: number;
  amount: number;
  interest: number;
  term: number;
  status: string;
  recieved: number;
  startDate: string;
  loanDueDate: string;
  payments: IPayment[];
}

export interface IPayment {
  id: number;
  loanId: number;
  paymentStatus: string;
  paymentDueDate: string;
  paymentDateFact: string;
  paymentAmount: number;
}
