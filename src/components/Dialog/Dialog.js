import {
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
  DialogTitle,
} from '@mui/material';
import React from 'react';

const CustomDialog = ({
  openPopup,
  handleCloseDialog,
  handleSubmit,
  content = '',
  title = '',
}) => {
  return (
    <Dialog
      open={openPopup}
      keepMounted
      onClose={handleCloseDialog}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='medium' onClick={handleCloseDialog}>
          Disagree
        </Button>
        <Button variant='contained' size='medium' onClick={handleSubmit}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
