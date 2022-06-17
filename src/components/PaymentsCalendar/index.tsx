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
    UPCOMING = '#FAFAFF',
    CURRENT = '#B9BAD4',
    PAYED = '#51c192',
    LATE = '#fb8936',
    MISSED = '#890b0b',
  }

  return (
    <Grid
      container
      spacing={0.5}
      columns={{ xs: 3, sm: 4, lg: 6 }}
      sx={{ mb: '20px' }}
    >
      {payments.length &&
        payments.map((payment: IPayment, index: number) => (
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
                  payment.paymentStatus === 'CURRENT' ||
                  payment.paymentStatus === 'MISSED'
                    ? 'item-light'
                    : ''
                }
              >
                {formatDate(payment.paymentDueDate.toString(), 'LLL dd')}
              </Typography>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default PaymentsCalendar;
