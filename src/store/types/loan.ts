import { DateTime } from 'luxon';

export interface ILoan {
  id: number;
  amount: number;
  interest: number;
  term: number;
  status: string;
  outstandingPrincipal: number;
  startDate: DateTime;
  loanDueDate: DateTime;
  payments: IPayment[];
}

export interface IPayment {
  id: number;
  loanId: number;
  paymentStatus: string;
  paymentDueDate: DateTime;
  paymentDateFact: DateTime;
  paymentAmount: number;
}
