import React, { FC } from 'react';

import { Box } from '@mui/system';

interface IProps {
  header: React.ReactNode;
  children: React.ReactElement;
}

const Layout: FC<IProps> = ({ header, children }) => {
  return (
    <>
      <Box>{header}</Box>
      <Box
        sx={{
          p: '27px 50px',
          bgcolor: '#ace694',
          backgroundImage: 'linear-gradient(135deg, #ace694 0%, #1697a0 100%)',
          flex: 1,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
