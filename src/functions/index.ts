import Dinero from 'dinero.js';
import { DateTime } from 'luxon';

export const formatMoney = (amount: number): string => {
  return Dinero({ amount, currency: 'EUR' }).toFormat('€0,0.00');
};

export const formatDate = (dateTime: string, format: string): string => {
  return DateTime.fromISO(dateTime).toFormat(format);
};
