import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Hidden,
  Toolbar,
  AppBar,
  Typography,
  Box,
  IconButton,
  makeStyles
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {},
  brand: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(4)
    }
  },
  navigator: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'noWrap'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  // const navigate = useNavigate();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}>
      <Toolbar disableGutters>
        <Hidden lgUp>
          <IconButton onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Box className={classes.brand}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Typography
            className={classes.title}
            variant="body2"
            noWrap>
            React Test
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Box className={classes.navigator}>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};
export default TopBar;
