import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import LoanTerms from '../LoanTerms';
import LoanCalendar from '../PaymentsCalendar';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatMoney } from '../../functions';
import { ILoan } from '../../store/types/loan';
import './style.scss';

export interface ILoanInterface {
  data: ILoan;
  className?: string;
}

const content = {
  CHARGEDOFF: 'The loan was charged off due to missed payments',
  PAYED: 'The loan was fully payed',
};

const Loan: FC<ILoanInterface> = ({ data }) => {
  return (
    <Box sx={{ mb: '20px' }} className='loan'>
      <Box sx={{ flexBasis: '60%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: '20px 23px',
            borderBottom: '1px solid #F3F4FA',
          }}
        >
          <Typography variant='h1' component='h2'>
            {formatMoney(Number(data.amount))}
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            className='loan__status'
          >
            <StatusBadge
              status={data.status as string}
              className='badge'
            ></StatusBadge>
            <Typography>{formatDate(String(data.startDate), 'DDD')}</Typography>
          </Box>
        </Box>

        <Stack
          direction='column'
          sx={{ px: '23px', pt: '30px' }}
          className='loan__details-container'
        >
          <Typography variant='body1' sx={{ mb: '10px' }}>
            {content[data.status as keyof typeof content]}
          </Typography>
          {data.payments && <LoanCalendar payments={data.payments} />}
        </Stack>
      </Box>
      <Box sx={{ p: '60px 20px 20px', borderLeft: '1px solid #F3F4FA' }}>
        <LoanTerms data={data} />
      </Box>
    </Box>
  );
};

export default Loan;
