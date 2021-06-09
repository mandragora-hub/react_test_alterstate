import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Hidden,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(2, 0)
  }
}));

const Searches = ({ className, query, onChangeQuery }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box className={clsx(className, classes.root)}>
      <Box display="flex">
        <TextField
          fullWidth={matches? true: false}
          variant="outlined"
          placeholder="Look for github users..."
          type="search"
          value={query}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onChange={onChangeQuery}
        />
        <Hidden smDown>
          <Box flexGrow={1} />
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="primary">
            Create User
          </Button>
        </Hidden>
      </Box>
    </Box>
  );
};

Searches.propTypes = {
  className: PropTypes.object,
  query: PropTypes.string,
  onChangeQuery: PropTypes.func
};

export default Searches;
