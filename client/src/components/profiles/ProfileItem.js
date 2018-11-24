import React, { Component } from "react";
import compose from "recompose/compose";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Menu,
  MenuItem,
  ListItemText,
  List,
  Dialog,
  Button,
  Typography,
  Avatar,
  IconButton,
  withTheme,
  withStyles,
  CardActions,
  Collapse
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import Done from "@material-ui/icons/Done";
import Face from "@material-ui/icons/Face";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  actions: {
    display: "flex"
  },
  card: {
    margin: theme.spacing.unit,
    flexGrow: 1
  },
  chip: {
    margin: theme.spacing.unit
  },
  avatar: {
    margin: 10
  },
  smallAvatar: {
    width: 50,
    height: 50
  },
  userName: {
    paddingTop: 15
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

class ProfileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      anchorEl: null
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { profile } = this.props;
    const { classes } = this.props;
    const AvatarIcon = () => {
      if (profile.user !== null) {
        return (
          <Avatar
            className={classNames(classes.avatar, classes.smallAvatar)}
            src={profile.user.avatar}
          />
        );
      } else {
        return (
          <Avatar className={classNames(classes.avatar, classes.smallAvatar)}>
            <Face />
          </Avatar>
        );
      }
    };
    const UserName = () => {
      if (profile.user !== null) {
        return profile.user.name;
      } else {
        return "Inactive User";
      }
    };

    function ListItemLinkProfile(props) {
      const { primary, onClick } = props;

      return (
        <li>
          <MenuItem button component={Link} to={`/profile/${profile.handle}`}>
            <ListItemText primary={primary} />
          </MenuItem>
        </li>
      );
    }

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={<AvatarIcon />}
            action={
              <IconButton
                aria-owns={open ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Typography variant="h5">
                <UserName classNames={classes.userName} />
              </Typography>
            }
          />

          <div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <ListItemLinkProfile primary="Profile" />
            </Menu>
          </div>

          <CardContent>
            <Grid container justify="flex-start" spacing={24} />
            <Grid item xs={6}>
              <div>
                {isEmpty(profile.company) ? null : (
                  <Typography variant="body1">
                    {profile.status} at {profile.company}
                  </Typography>
                )}
              </div>
              <div>
                {isEmpty(profile.location) ? null : (
                  <Typography variant="body1">{profile.location}</Typography>
                )}
              </div>
            </Grid>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                className={classNames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Skill Set</Typography>
                <div>
                  {profile.skills.slice(0, 4).map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      icon={<Done />}
                      className={classes.chip}
                    />
                  ))}
                </div>
              </Grid>
            </Collapse>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withTheme(),
  withStyles(styles)
)(ProfileItem);
