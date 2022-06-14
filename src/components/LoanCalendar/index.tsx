import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { IPayment } from '../../store/types';
import { formatDate } from '../../functions';
import './style.scss';

interface IProps {
  payments: IPayment[];
}

const PaymentsCalendar: FC<IProps> = ({ payments }) => {
  enum paymentStatusColors {
    PAYED = '#82E3BA',
    LATE = '#FB6E07',
    CURRENT = '#B9BAD4',
    UPCOMING = '#FAFAFF',
  }

  return (
    <Grid container spacing={0.5} columns={{ xs: 3, sm: 4, lg: 6 }}>
      {payments.map((payment: IPayment, index: number) => (
        <Grid item xs={1} md={1} key={index} className="payments">
          <Paper
            className="payments__item"
            sx={{
              backgroundColor: `${
                paymentStatusColors[
                  payment.paymentStatus as keyof typeof paymentStatusColors
                ]
              }`,
            }}
          >
            <Typography
              variant="buttonMini"
              className={
                payment.paymentStatus === 'LATE' ||
                payment.paymentStatus === 'CURRENT'
                  ? 'item-light'
                  : ''
              }
            >
              {formatDate(payment.paymentDueDate, 'LLL dd')}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PaymentsCalendar;
