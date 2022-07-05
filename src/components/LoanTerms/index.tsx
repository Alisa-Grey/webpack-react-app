import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { Box, Stack, Typography } from '@mui/material';
import { ILoanInterface } from '../Loan';
import { calcAmountPayed, formatMoney } from '../../functions/index';
import { ILoan, IPayment } from '../../store/types/loan';
import './style.scss';

const LoanTerms: FC<ILoanInterface> = ({ data }) => {
  const isLoanClosed = (loan: ILoan): boolean => {
    if (loan.status === 'PAYED' || loan.status === 'CHARGEDOFF') {
      return true;
    }
    return false;
  };

  const nextPayment = data.payments.filter(
    (payment) => payment.paymentStatus === 'CURRENT'
  );
  let nextDate = DateTime.now();

  const getNextDate = (
    data: ILoan,
    payment: IPayment,
    lastPayment: IPayment
  ): DateTime => {
    if (data.payments.length === 0) {
      nextDate = data.startDate.plus({
        month: 1,
      });
    } else if (data.payments.length !== 0 && !isLoanClosed) {
      nextDate = payment.paymentDueDate;
    } else {
      nextDate = lastPayment.paymentDueDate;
    }
    return nextDate;
  };

  const total = Number(data.amount) + Number(data.interest);
  const amountPayed = calcAmountPayed(data.payments);

  return (
    <Stack
      direction={'row'}
      spacing={{ xs: '40px', sm: '80px' }}
      className='details'
    >
      <Stack direction={'column'} spacing={'30px'}>
        <Box className='details__inner-wrap'>
          <Typography variant='body2'>Loan Amount:</Typography>
          <Typography variant='h2' sx={{ mb: '20px' }}>
            {formatMoney(total)}
          </Typography>
        </Box>
        {!isLoanClosed(data) ? (
          <>
            <Box className='details__inner-wrap'>
              <Typography variant='body2'>Amount payed:</Typography>
              <Typography variant='h2' sx={{ mb: '20px' }}>
                {formatMoney(Number(amountPayed))}
              </Typography>
            </Box>
            <Box className='details__inner-wrap'>
              <Typography variant='body2'>Current Loan:</Typography>
              <Typography variant='h2' sx={{ mb: '20px' }}>
                {formatMoney(data.outstandingPrincipal)}
              </Typography>
            </Box>
          </>
        ) : (
          <Box>
            <Typography variant='body2'>Total payed:</Typography>
            <Typography variant='h2' sx={{ mb: '20px' }}>
              +{formatMoney(amountPayed)}
            </Typography>
          </Box>
        )}
      </Stack>
      <Stack direction={'column'} spacing={'30px'}>
        <Box className='details__inner-wrap'>
          <Typography variant='body2'>Loan Term:</Typography>
          <Typography variant='h2' sx={{ mb: '20px' }}>
            {data.term} months
          </Typography>
        </Box>
        <Box className='details__inner-wrap'>
          <Typography variant='body2'>Monthly payment:</Typography>
          <Typography variant='h2' sx={{ color: '#2FBB80 ', mb: '20px' }}>
            {formatMoney(Math.ceil(total / 12))}
          </Typography>
        </Box>
        <Box className='details__inner-wrap'>
          <Typography variant='body2'>
            {!isLoanClosed(data) ? 'Next payment:' : 'Last payment:'}
          </Typography>
          <Typography variant='h2'>
            {getNextDate(
              data,
              nextPayment[0],
              data.payments[data.payments.length - 1]
            ).toLocaleString(DateTime.DATE_MED)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LoanTerms;
