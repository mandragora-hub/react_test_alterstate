import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: { height: '100%' }
}));

const Footer = ({ className, content, ...rest }) => {
  const classes = useStyles();
  return (
    <Box
      className={clsx(classes.root, className)}
      {...rest}>
      {content}
    </Box>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  content: PropTypes.func
};

export default Footer;
