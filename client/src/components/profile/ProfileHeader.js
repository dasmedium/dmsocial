import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import compose from "recompose/compose";
import isEmpty from "../../validation/is-empty";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Icon,
  withStyles,
  withTheme,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: "gray"
    }
  }
});

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <CardHeader>
              <Avatar
                src={profile.user.avatar}
                alt=""
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            </CardHeader>

            <Typography variant="h1">{profile.user.name}</Typography>
            <Typography variant="title">{profile.status} </Typography>
            {isEmpty(
              profile.company ? null : (
                <Typography variant="h6">at {profile.company}</Typography>
              )
            )}

            {isEmpty(
              profile.location ? null : (
                <Typography variant="h5">{profile.location}</Typography>
              )
            )}

            {isEmpty(profile.website) ? null : (
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconHover,
                  "fas fa-globe fa-2x"
                )}
                href={profile.website}
                target="_blank"
                color="primary"
              />
            )}

            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconHover,
                  "fab fa-twitter fa-2x"
                )}
                href={profile.social.twitter}
                target="_blank"
                color="primary"
              />
            )}

            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconHover,
                  "fab fa-facebook fa-2x"
                )}
                href={profile.social.facebook}
                target="_blank"
                color="primary"
              />
            )}

            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconHover,
                  "fab fa-linkedin fa-2x"
                )}
                href={profile.social.linkedin}
                target="_blank"
                color="primary"
              />
            )}

            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconHover,
                  "fab fa-youtube fa-2x"
                )}
                href={profile.social.youtube}
                target="_blank"
                color="primary"
              />
            )}

            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <Icon
                className={classNames(
                  classes.icon,
                  classes.iconHover,
                  "fab fa-instagram fa-2x"
                )}
                href={profile.social.instagram}
                target="_blank"
                color="primary"
              />
            )}
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
