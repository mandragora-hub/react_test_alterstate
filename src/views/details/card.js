import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography,
  Box,
  Avatar,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useClient from 'src/utils/api-client';
import { useQuery } from 'react-query';

const Section = props => {
  const { title, text } = props;
  return (
    <Box py={2}>
      <Typography variant="h6">{title}</Typography>
      <Typography
        variant="body1"
        color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  column: {
    flexGrow: 1,
    padding: theme.spacing(2, 0)
  }
}));

const EnhancedCard = ({ className, userId }) => {
  const classes = useStyles();
  const client = useClient();
  const { data: user } = useQuery(['details', 'user', userId], () => {
    return client(`user/${userId}`);
  });
  if (!user) return <></>;

  return (
    <Card className={clsx(className, classes.root)}>
      <CardHeader
        avatar={<Avatar
          className={classes.avatar}
          src={user.avatar_url} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={user.login}
        subheader={moment(user.created_at).format('Do dddd MMMM gggg')}
      />
      <CardContent>
        <Box display="flex">
          <Box className={classes.column}>
            <Section
              title="ID"
              text={user.id} />
            <Section
              title="Type"
              text={user.type} />
            <Section
              title="Public Repos"
              text={user.public_repos} />
            <Section
              title="Followers"
              text={user.followers} />
          </Box>
          <Box className={classes.column}>
            <Section
              title="Node ID"
              text={user.node_id} />
            <Section
              title="Site Admin"
              text={user.site_admin ? 'True' : 'False'}
            />
            <Section
              title="Public Gists"
              text={user.public_gists} />
            <Section
              title="following"
              text={user.following} />
          </Box>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
        <Box flexGrow={1} />
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

EnhancedCard.propTypes = {
  className: PropTypes.object,
  userId: PropTypes.number
};

export default EnhancedCard;
