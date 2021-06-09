import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IconButton, Collapse, Box, makeStyles } from '@material-ui/core';
import useQuery from 'src/utils/query';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {},
  userFriendly: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  item: {
    padding: theme.spacing(0, 1)
  }
}));


const LogoutAlert = ({ onClose, ...rest }) => {
  return (
    <Alert
      severity="info"
      action={
        <IconButton
          color="inherit"
          size="small"
          onClick={onClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
      <AlertTitle>Logout</AlertTitle>
      This is an info alert — <strong>check it out!</strong>
    </Alert>
  );
};
const VerifyAlert = ({ onClose, ...rest }) => {
  return (
    <Alert
      action={
        <IconButton
          color="inherit"
          size="small"
          onClick={onClose}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
      <AlertTitle>Verify you email</AlertTitle>
    </Alert>
  );
};

const Alerts = ({ className, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  
  let query = useQuery();
  const lgt = query.get('lgt'); ///logout
  const ve = query.get('ve'); ///verify email

  return (
    <Box
      className={clsx(classes.root, className)}
      {...rest}>

      {/* Alerts  */}
      <Collapse in={open}>
        {lgt === '1' && <LogoutAlert onClose={() => setOpen(false)} />}
        {ve === '1' && <VerifyAlert onClose={() => setOpen(false)} />}
      </Collapse>
    </Box>
  );
};

Alerts.propTypes = {
  className: PropTypes.string,
};

export default Alerts;
