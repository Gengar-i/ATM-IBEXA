import React, { ReactNode } from "react";
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackBarProps extends SnackbarProps {
  label: ReactNode;
  onClose: any;
};

const MuiSnackBar: React.FC<SnackBarProps> = ({ open, autoHideDuration, onClose, label }) => (
  <Snackbar
    open={open}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
  >
    <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
      {label}
    </Alert>
  </Snackbar>
);

export default MuiSnackBar;
