import React from 'react';
import {
  Button,
  Typography,
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import LayoutView from 'src/components/outlook';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    marginBottom: 20,
    display: 'inline-block',
    maxWidth: '100%',
    width: '65%',
    opacity: 0.8
  }
}));

const NotFoundView = () => {
  const classes = useStyles();

  return (
    <LayoutView
      className={classes.root}
      pageTitle="Error">
      <Container maxWidth="md">
        <Box textAlign="center">
          <img
            alt="Under development"
            className={classes.image}
            src="/static/images/404_error.svg"
          />
        </Box>

        <Typography
          color="textSecondary"
          variant="h5"
          align="center"
          gutterBottom>
          We're sorry! This page does not exist.
        </Typography>
        <Typography
          paragraph
          color="textSecondary"
          variant="subtitle1"
          align="center"
          gutterBottom>
          The page you are looking for does not exist. Double check the URL you
          entered, or go back to the home page.
        </Typography>
        <Button
          component="a"
          href="/"
          fullWidth
          color="primary"
          variant="contained">
          Go Home
        </Button>
      </Container>
    </LayoutView>
  );
};

export default NotFoundView;
