import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import Alerts from './Alerts';
// import { Link as RouterLink } from 'react-router-dom';
// import { Edit, MoreHorizontal } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Toolbar = ({ className, content, ...rest }) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(classes.root, className)}
      {...rest}>
      {content && content}
      <Alerts />
    </Box>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  content: PropTypes.element
};

export default Toolbar;
