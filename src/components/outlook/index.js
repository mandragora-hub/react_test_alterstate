import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import Footer from './Footer';
// import LoadingView from 'src/components/LoadingView';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },

  content: {
    flex: '1 0 auto'
  },
  footer: {
    // ? flexShrink: 0 ? check this
  }
}));

const LayoutView = ({ className, pageTitle, toolbar, footer, children }) => {
  const classes = useStyles();

  return (
    <Page
      className={clsx(classes.root, className)}
      title={pageTitle}>
      <Toolbar content={toolbar} />
      <Box className={classes.content}>{children}</Box>
      <Footer
        className={classes.footer}
        content={footer} />
    </Page>
  );
};

LayoutView.propTypes = {
  className: PropTypes.string,
  pageTitle: PropTypes.string,
  toolbar: PropTypes.element,
  footer: PropTypes.func,
  children: PropTypes.node.isRequired
  // data: PropTypes.object
};

export default LayoutView;
