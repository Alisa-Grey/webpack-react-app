import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import LoanTerms from '../LoanTerms';
import LoanCalendar from '../LoanCalendar';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatMoney } from '../../functions';
import { ILoan } from '../../store/types';

export interface ILoanInterface {
  data: ILoan;
  className?: string;
}

const content = {
  CURRENT: `Your bill we be payed soon. Estimated payment date: ${DateTime.now()
    .plus({ days: 2 })
    .toLocaleString(DateTime.DATE_MED)}`,
  CHARGEDOFF: 'The loan was closed',
  PAYED: 'The loan was fully payed',
};

const Loan: FC<ILoanInterface> = ({ data }) => {
  return (
    <Box sx={{ mb: '20px' }}>
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
          <Typography variant="h1" component="h2">
            {formatMoney(Number(data.amount))}
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            className="loan__status"
          >
            <StatusBadge
              status={data.status as string}
              className="badge"
            ></StatusBadge>
            <Typography>{formatDate(String(data.startDate), 'DDD')}</Typography>
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ px: '23px', pt: '30px' }}
          className="loan__details-container"
        >
          <Box className="loan__details">
            <Typography variant="body1">
              {content[data.status as keyof typeof content]}
            </Typography>
          </Box>
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
