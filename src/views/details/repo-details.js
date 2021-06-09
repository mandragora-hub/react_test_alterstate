import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Dialog,
  Link,
  Box,
  Avatar,
  Typography,
  IconButton,
  DialogTitle as MuiDialogTitle,
  DialogContent,
  makeStyles,
  withStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const Section = props => {
  const { title, text } = props;
  return (
    <Box py={2}>
      <Typography
        gutterBottom
        variant="h6">
        {title}
      </Typography>
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
    display: 'flex',
    alignItems: 'center',
    columnGap: theme.spacing(2)
  }
}));

const DialogRepoDetails = ({ className, index, open, repos, onClose }) => {
  const classes = useStyles();

  if (repos === []) return <></>
  return (
    <Dialog
      className={clsx(className, classes.root)}
      fullWidth
      open={open}>
      <DialogTitle onClose={onClose}>{repos[index].full_name}</DialogTitle>
      <DialogContent>
        <Box py={2}>
          <Typography
            gutterBottom
            variant="h6">
            Owner
          </Typography>
          <Box className={classes.avatar}>
            <Avatar src={repos[index].owner.avatar_url} />
            <Typography variant="body1">{repos[index].owner.login}</Typography>
          </Box>
        </Box>
        <Box py={2}>
          <Typography
            gutterBottom
            variant="h6">
            Repo URL
          </Typography>
          <Link
            href={repos[index].html_url}
            variant="body1">
            Click Here
          </Link>
        </Box>
        <Section
          title="Node ID"
          text={repos[index].node_id} />
        <Section
          title="Language"
          text={repos[index].language} />
        <Section
          title="Watchers_count"
          text={repos[index].watchers_count} />
        <Section
          title="Watchers"
          text={repos[index].watchers} />
        <Section
          title="Size"
          text={repos[index].size} />
        <Section
          title="Default branch"
          text={repos[index].default_branch} />
        <Section
          title="Create at"
          text={moment(repos[index].created_at).format('YYYY-MM-DD')}
        />
        <Section
          title="Description"
          text={repos[index].description} />
      </DialogContent>
    </Dialog>
  );
};

DialogRepoDetails.propTypes = {
  className: PropTypes.object,
  open: PropTypes.bool,
  repos: PropTypes.array,
  index: PropTypes.number,
  onClose: PropTypes.func
};

export default DialogRepoDetails;
