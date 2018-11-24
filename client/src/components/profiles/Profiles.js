import React, { Component } from "react";
import { connect } from "react-redux";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import { Grid, Typography, withTheme, withStyles } from "@material-ui/core";
import ProfileItem from "./ProfileItem";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { classes } = this.props;
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles == null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <Typography variant="h4">No Profiles found</Typography>;
      }
    }

    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item lg="auto">
            {profileItems}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(
  withStyles(styles),
  withTheme(),
  connect(
    mapStateToProps,
    { getProfiles }
  )
)(Profiles);
