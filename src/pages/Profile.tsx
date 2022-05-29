import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Layout from './Layout';
import Header from '../components/header';

const customerData = {
  first_name: 'Anna',
  last_name: 'Addams',
  loans: [],
};

const Profile: FC = () => {
  return (
    <Layout header={<Header data={customerData} />}>
      <Box>
        <Typography>Profile</Typography>
      </Box>
    </Layout>
  );
};

export default Profile;
