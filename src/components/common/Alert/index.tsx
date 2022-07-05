import React, { useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='outlined' {...props} />;
});

const CustomAlert: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alertState, setAlertState] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
  };

  return (
    <>
      <Snackbar
        open={alertState}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          // severity={alertState.severity}
          sx={{ width: '100%' }}
          variant='filled'
        >
          {/* {alertState.message} */}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
