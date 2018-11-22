import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withTheme } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Button from "@material-ui/core/Button";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import ProfileLink from "../common/ProfileLink";

import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "red"
  },
  input: {
    display: "none"
  },
  root: {
    width: "100%"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <ProfileActions />

            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.onDeleteClick.bind(this)}
            >
              Delete My Account
            </Button>
          </div>
        );
      } else {
        // User is logged but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {dashboardContent}
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default compose(
  withTheme(),
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCurrentProfile, deleteAccount }
  )
)(Dashboard);
