import React, { FC } from 'react';
import { DateTime } from 'luxon';
import { Box, Stack, Typography } from '@mui/material';
import { ILoanInterface } from '../Loan';
import { formatMoney } from '../../functions/index';
import { ILoan, IPayment } from '../../store/types';

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

  const getNextDate = (
    data: ILoan,
    payment: IPayment,
    lastPayment: IPayment
  ): DateTime => {
    let nextDate;
    if (data.payments.length === 0) {
      nextDate = DateTime.fromISO(data.startDate as string).plus({
        month: 1,
      });
    } else if (data.payments.length !== 0 && !isLoanClosed) {
      nextDate = DateTime.fromISO(payment.paymentDueDate);
    } else {
      nextDate = DateTime.fromISO(lastPayment.paymentDueDate);
    }
    return nextDate;
  };

  const total = Number(data.amount) + Number(data.interest);
  const totalLeft = total - Number(data.recieved);

  return (
    <Stack
      direction={'row'}
      spacing={{ xs: '40px', sm: '80px' }}
      sx={{
        justifyContent: 'center',
        mb: '40px',
      }}
    >
      <Stack direction={'column'} spacing={'30px'}>
        {!isLoanClosed(data) ? (
          <>
            <Box>
              <Typography variant="body2">Loan Amount:</Typography>
              <Typography variant="h2" sx={{ mb: '20px' }}>
                {formatMoney(total)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">Amount payed:</Typography>
              <Typography variant="h2" sx={{ mb: '20px' }}>
                {formatMoney(Number(data.recieved))}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">Current Loan:</Typography>
              <Typography variant="h2" sx={{ mb: '20px' }}>
                {formatMoney(totalLeft)}
              </Typography>
            </Box>
          </>
        ) : (
          <Box>
            <Typography variant="body2">Total payed:</Typography>
            <Typography variant="h2" sx={{ mb: '20px' }}>
              {formatMoney(data.recieved)}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography variant="body2">Next payment:</Typography>
          <Typography variant="h2">
            {getNextDate(
              data,
              nextPayment[0],
              data.payments[data.payments.length - 1]
            ).toLocaleString(DateTime.DATE_MED)}
          </Typography>
        </Box>
      </Stack>
      <Stack direction={'column'} spacing={'30px'}>
        <Box>
          <Typography variant="body2">Loan Term:</Typography>
          <Typography variant="h2" sx={{ mb: '20px' }}>
            {data.term} months
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">Monthly payment:</Typography>
          <Typography variant="h2" sx={{ color: '#2FBB80 ' }}>
            {formatMoney(Math.ceil(total / 12))}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LoanTerms;
