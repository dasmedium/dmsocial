import React, { Component } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import {
  Typography,
  withStyles,
  Chip,
  Grid,
  withTheme
} from "@material-ui/core";
import Done from "@material-ui/icons/Done";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  chip: {
    margin: theme.spacing.unit
  },
  chipdiv: {
    flexGrow: 1
  }
});

class ProfileAbout extends Component {
  render() {
    const { classes } = this.props;
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill List
    const skills = profile.skills.map((skill, index) => (
      <Chip
        label={skill}
        key={index}
        className={classes.chip}
        icon={<Done />}
      />
    ));

    return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h4">{firstName}'s Bio</Typography>
          <Typography paragraph>
            {isEmpty(profile.bio) ? (
              <Typography variant="body1">
                {firstName} does not have a bio.
              </Typography>
            ) : (
              <Typography paragraph>{profile.bio}</Typography>
            )}
          </Typography>
          <hr />
          <Typography variant="h4">Skill Set</Typography>

          <Grid item xs={12} justify="center" className={classes.chipdiv}>
            {skills}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withTheme()
)(ProfileAbout);
