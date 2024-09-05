import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { CloseIcon } from '../../icons';

const SnackbarComponent = ({ isOpen = false, snackbarCaption }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  });
  const { vertical, horizontal, open } = snackbarState;

  const handleClick = () => {
    setSnackbarState({ open: true, vertical: 'top', horizontal: 'right' });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ open: false, vertical: 'top', horizontal: 'right' });
  };

  useEffect(() => {
    if (isOpen === true) {
      handleClick();
    }
  }, [isOpen]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={1000}
        onClose={handleClose}
        message={snackbarCaption}
        action={action}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default SnackbarComponent;
