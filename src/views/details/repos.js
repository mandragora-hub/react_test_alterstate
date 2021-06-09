import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RepoDialog from './repo-details';
import useClient from 'src/utils/api-client';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2)
  }
}));

const Repos = ({ className, userId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showRepo, setShowRepo] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = showRepo => {
    setShowRepo(parseInt(showRepo));
    setOpen(true);
  };
  const client = useClient();
  const { data: repos } = useQuery(['repos', 'user', userId], () => {
    return client(`user/${userId}/repos`);
  });
  if (!repos) return <></>;

  return (
    <Card className={clsx(className, classes.root)}>
      <CardHeader title={repos === [] ? 'Dont have Repos' : 'Repos' } />
      <CardContent>
        <List>
          {repos.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleOpen(index)}
              button>
              <ListItemText
                primary={item.full_name}
                secondary={item.name} />
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </CardContent>
      {repos !== [] && (
        <RepoDialog
          open={open}
          index={showRepo}
          onClose={handleClose}
          repos={repos}
        />
      )}
    </Card>
  );
};

Repos.propTypes = {
  className: PropTypes.object,
  userId: PropTypes.number
};

export default Repos;
