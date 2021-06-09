import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import LayoutView from 'src/components/outlook';
import Table from './table';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  }, 
  container: {
    padding: theme.spacing(2, 0)
  }
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <LayoutView
      className={classes.root}
      pageTitle="Home">
      <Box className={classes.container}>
        <Container>
          <Table />
        </Container>
      </Box>
    </LayoutView>
  );
};

export default HomeView;
