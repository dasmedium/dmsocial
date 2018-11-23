import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
  Typography,
  CardMedia,
  Button
} from "@material-ui/core";

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
    const avatar = (
      <Avatar
        src={profile.user.avatar}
        alt=""
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    );

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container justify="center">
              <div>{avatar}</div>
            </Grid>
            <Typography align="center" variant="h3">
              {profile.user.name}
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
                <Button component={Link} to={profile.website}>
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
                <Button component={Link} to={profile.social.twitter}>
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
                <Button component={Link} to={profile.social.facebook}>
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
                <Button component={Link} to={profile.social.linkedin}>
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
                <Button component={Link} to={profile.social.youtube}>
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
                <Button component={Link} to={profile.social.instagram}>
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
