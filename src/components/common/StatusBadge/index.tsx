import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

enum statusColors {
  CURRENT = '#51c192',
  PAYED = '#1697a0',
  LATE = '#fb8936',
  CHARGEDOFF = '#890b0b',
}

enum statusTitles {
  CURRENT = 'Current',
  PAYED = 'Payed',
  LATE = 'Late',
  CHARGEDOFF = 'Charged off',
}

export interface IStatusBadgeInterface {
  status: string;
  className?: string;
}

const StatusBadge: FC<IStatusBadgeInterface> = ({ status, className }) => {
  const color = statusColors[status as keyof typeof statusColors];
  const title = statusTitles[status as keyof typeof statusTitles];

  return (
    <Box
      sx={{
        width: 'max-content',
        padding: '7px 16px',
        borderRadius: '4px',
        backgroundColor: `${color}`,
      }}
      className={className}
    >
      <Typography variant="caption" sx={{ fontWeight: 600, color: '#fff' }}>
        {title}
      </Typography>
    </Box>
  );
};

export default StatusBadge;
