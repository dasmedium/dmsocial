import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import compose from "recompose/compose";
import isEmpty from "../../validation/is-empty";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Icon,
  withStyles,
  withTheme,
  Typography,
  Button
} from "@material-ui/core";
import Face from "@material-ui/icons/Face";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit,
    backgroundColor: "#d9d9d9"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 150,
    height: 150
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: "gray"
    }
  },
  media: {
    height: 140
  }
});

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const { classes } = this.props;

    const AvatarIcon = () => {
      if (profile.user !== null) {
        return (
          <Avatar
            className={classNames(classes.avatar, classes.bigAvatar)}
            src={profile.user.avatar}
          />
        );
      } else {
        return (
          <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>
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

    // const avatar = (
    //   <Avatar
    //     src={profile.user.avatar}
    //     alt=""
    //     className={classNames(classes.avatar, classes.bigAvatar)}
    //   />
    // );

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container justify="center">
              <AvatarIcon />
            </Grid>
            <Typography align="center" variant="h3">
              <UserName />
            </Typography>
            <Typography align="center" variant="title">
              {profile.status}{" "}
            </Typography>
            {isEmpty(
              profile.company ? null : (
                <Typography align="center" variant="h6">
                  at {profile.company}
                </Typography>
              )
            )}

            {isEmpty(
              profile.location ? null : (
                <Typography align="center" variant="h5">
                  {profile.location}
                </Typography>
              )
            )}
            <Grid container justify="center">
              {isEmpty(profile.website) ? null : (
                <Button href={profile.website}>
                  <Icon
                    className={classNames(
                      classes.icon,
                      classes.iconHover,
                      "fas fa-globe fa-2x"
                    )}
                    color="primary"
                  />
                </Button>
              )}

              {isEmpty(profile.social && profile.social.twitter) ? null : (
                <Button href={profile.social.twitter}>
                  <Icon
                    className={classNames(
                      classes.icon,
                      classes.iconHover,
                      "fab fa-twitter fa-2x"
                    )}
                    color="primary"
                  />
                </Button>
              )}

              {isEmpty(profile.social && profile.social.facebook) ? null : (
                <Button href={profile.social.facebook}>
                  <Icon
                    className={classNames(
                      classes.icon,
                      classes.iconHover,
                      "fab fa-facebook fa-2x"
                    )}
                    color="primary"
                  />
                </Button>
              )}

              {isEmpty(profile.social && profile.social.linkedin) ? null : (
                <Button href={profile.social.linkedin}>
                  <Icon
                    className={classNames(
                      classes.icon,
                      classes.iconHover,
                      "fab fa-linkedin fa-2x"
                    )}
                    color="primary"
                  />
                </Button>
              )}

              {isEmpty(profile.social && profile.social.youtube) ? null : (
                <Button href={profile.social.youtube}>
                  <Icon
                    className={classNames(
                      classes.icon,
                      classes.iconHover,
                      "fab fa-youtube fa-2x"
                    )}
                    color="primary"
                  />
                </Button>
              )}

              {isEmpty(profile.social && profile.social.instagram) ? null : (
                <Button href={profile.social.instagram}>
                  <Icon
                    className={classNames(
                      classes.icon,
                      classes.iconHover,
                      "fab fa-instagram fa-2x"
                    )}
                    color="primary"
                  />
                </Button>
              )}
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withTheme()
)(ProfileHeader);
