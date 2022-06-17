import Dinero from 'dinero.js';
import { DateTime } from 'luxon';
import { ILoan, IPayment } from '../store/types';

export const formatMoney = (amount: number): string => {
  return Dinero({ amount, currency: 'EUR' }).toFormat('$0,0.00');
};

export const formatDate = (dateTime: string, format: string): string => {
  return DateTime.fromISO(dateTime).toFormat(format);
};

export const generateRandomNumber = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const chooseRandomValue = (data: unknown[]): number => {
  return Math.floor(Math.random() * data.length);
};

const setLoanStatus = (start: DateTime, end: DateTime, period: number) => {
  let status;
  let statuses = ['CURRENT', 'CHARGEDOFF', 'PAYED'];
  if (start < DateTime.now().minus({ months: period })) {
    statuses = statuses.filter((el) => el !== 'CURRENT');
    status = statuses[chooseRandomValue(statuses)];
  } else if (end > DateTime.now()) {
    statuses = statuses.filter((el) => el !== 'PAYED');
    status = statuses[chooseRandomValue(statuses)];
  } else {
    status = statuses[chooseRandomValue(statuses)];
  }
  return status;
};

const setPaymentStatus = (
  value: string,
  index: number,
  len: number,
  date: DateTime
): string => {
  let paymentStatuses = ['UPCOMING', 'CURRENT', 'PAYED', 'LATE', 'MISSED'];
  let paymentStatus = 'UPCOMING';
  if (value === 'PAYED' || (value === 'CURRENT' && date < DateTime.now())) {
    paymentStatus = 'PAYED';
  } else if (value === 'CHARGEDOFF' && index < len / 2) {
    paymentStatuses = paymentStatuses.filter(
      (el) => el === 'PAYED' || el === 'LATE'
    );
    paymentStatus = paymentStatuses[chooseRandomValue(paymentStatuses)];
  } else if (value === 'CHARGEDOFF' && index >= len / 2) {
    paymentStatus = 'MISSED';
  } else if (
    (value === 'CURRENT' && date === DateTime.now()) ||
    (value === 'CURRENT' && date < DateTime.now().plus({ months: 1 }))
  ) {
    paymentStatus = 'CURRENT';
  }
  return paymentStatus;
};

export const calcAmountPayed = (payments: IPayment[]) => {
  const paymentsDone = payments.filter(
    (payment) => payment.paymentStatus === 'PAYED'
  );
  let amount = 0;
  if (paymentsDone.length) {
    amount = paymentsDone
      .map((payment) => payment.paymentAmount)
      .reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
      });
  }
  return Math.ceil(amount);
};

export const generateLoan = (): ILoan => {
  const terms = [6, 12, 24];
  const startDates = [
    DateTime.now(),
    DateTime.now().minus({ month: 2 }),
    DateTime.now().minus({ month: 10 }),
    DateTime.now().minus({ days: 10 }),
    DateTime.now().minus({ years: 2 }),
    DateTime.now().minus({ month: 1 }),
  ];
  const id = generateRandomNumber(1, 100);
  const amount = generateRandomNumber(100000, 350000);
  const interest = generateRandomNumber(5, 10) / 100;
  const term = terms[chooseRandomValue(terms)];
  const startDate = startDates[chooseRandomValue(startDates)];
  const dueDate = startDate.plus({ months: term });
  const status = setLoanStatus(startDate, dueDate, term);
  const payments = generatePayments(
    amount,
    interest,
    term,
    id,
    startDate,
    status
  );

  const loan = {
    id: id,
    amount: amount,
    interest: Math.ceil(amount * interest),
    term: term,
    status: status,
    outstandingPrincipal: Math.ceil(
      amount + interest - calcAmountPayed(payments)
    ),
    startDate: startDate,
    loanDueDate: dueDate,
    payments: payments,
  };

  return loan;
};

export const generatePayments = (
  amount: number,
  interest: number,
  term: number,
  loanId: number,
  startDate: DateTime,
  status: string
): IPayment[] => {
  const payments = [];

  for (let i = 0; i < term; i++) {
    const dueDate = startDate.plus({ month: i + 1 });
    payments.push({
      id: i,
      loanId: loanId,
      paymentStatus: setPaymentStatus(status, i, term - 1, dueDate),
      paymentDueDate: dueDate,
      paymentDateFact: startDate.plus({ month: i + 1 }),
      paymentAmount: Math.ceil((amount + interest) / term),
    });
  }
  return payments;
};
