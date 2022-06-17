import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { generateLoan, generateRandomNumber } from '../functions';
import Loan from '../components/Loan';

const Loans: FC = () => {
  const len = generateRandomNumber(1, 4);
  const loans = [...Array(len)].map(() => generateLoan());
  loans.forEach((loan) => {
    if (loan.status === 'CHARGEDOFF') {
      console.log('loan.payments', loan.payments);
    }
  });
  return (
    <Box>
      <Typography>Loans</Typography>
      {loans && (
        <Stack direction="column">
          <Typography variant="h6">
            You have {loans.length} {loans.length === 1 ? 'loan' : 'loans'}
          </Typography>
          {loans.map((loan) => (
            <Loan data={loan} key={loan.id} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Loans;
