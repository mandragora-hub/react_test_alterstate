import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, makeStyles } from '@material-ui/core';
import LayoutView from 'src/components/outlook';
import Card from './card';
import Repos from './repos';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  container: {
    padding: theme.spacing(2, 0)
  }
}));

const DetailsView = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <LayoutView
      className={classes.root}
      pageTitle="Details">
      <Box className={classes.container}>
        <Container>
          <Card userId={parseInt(id)} />
          <Repos userId={parseInt(id)}/>
        </Container>
      </Box>
    </LayoutView>
  );
};

export default DetailsView;
