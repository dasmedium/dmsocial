import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import compose from "recompose/compose";
import _ from "lodash";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCurrentProfile,
  editExperience
} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import {
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  withTheme,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const experience = profile.experience;
      const myExp = _.find(experience, ["_id", this.props.match.params.exp_id]);

      // If Experience field does not exist, make empty string
      myExp.title = !isEmpty(myExp.title) ? myExp.title : "";
      myExp.company = !isEmpty(myExp.company) ? myExp.company : "";
      myExp.location = !isEmpty(myExp.location) ? myExp.location : "";
      myExp.from = !isEmpty(myExp.from) ? myExp.from : "";
      myExp.to = !isEmpty(myExp.to) ? myExp.to : "";
      myExp.current = !isEmpty(myExp.current) ? myExp.current : "";
      myExp.description = !isEmpty(myExp.description) ? myExp.description : "";

      // Set component field state
      this.setState({
        company: myExp.company,
        title: myExp.title,
        location: myExp.location,
        from: myExp.from,
        to: myExp.to,
        current: myExp.current,
        description: myExp.description
      });
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.editExperience(
      this.props.match.params.exp_id,
      expData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item lg={12}>
            <Button component={Link} to="/dashboard" variant="contained">
              Go Back
            </Button>
            <Typography variant="h4" align="center">
              Edit your experience.
            </Typography>
            <Typography variant="body1">
              Edit your {this.state.title} position, location or add more
              details about your involvement.
            </Typography>
            <Typography variant="caption">* = required fields</Typography>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                label="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                label="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                label="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />

              <TextFieldGroup
                label="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />

              <TextFieldGroup
                label="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? "disabled" : ""}
              />
              <FormControlLabel
                label="Current Job"
                control={
                  <Checkbox
                    color="primary"
                    type="checkbox"
                    id="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                }
              />
              <TextAreaFieldGroup
                placeholder="Job Description"
                label="Job Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about this position"
                variant="outlined"
                multiline={true}
                fullWidth={true}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default compose(
  withTheme(),
  withStyles(styles),
  connect(
    mapStateToProps,
    { getCurrentProfile, editExperience }
  )
)(withRouter(AddExperience));
