import React, { Component } from "react";
import compose from "recompose/compose";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";
import _ from "lodash";
import { editEducation, getCurrentProfile } from "../../actions/profileActions";
import Button from "@material-ui/core/Button";
import { withTheme, withStyles } from "@material-ui/core";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Grid
} from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: "100%"
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%"
  }
});

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
      const education = profile.education;
      const myEdu = _.find(education, ["_id", this.props.match.params.edu_id]);

      // If Experience field does not exist, make empty string
      myEdu.school = !isEmpty(myEdu.school) ? myEdu.school : "";
      myEdu.degree = !isEmpty(myEdu.degree) ? myEdu.degree : "";
      myEdu.fieldofstudy = !isEmpty(myEdu.fieldofstudy)
        ? myEdu.fieldofstudy
        : "";
      myEdu.from = !isEmpty(myEdu.from) ? myEdu.from : "";
      myEdu.to = !isEmpty(myEdu.to) ? myEdu.to : "";
      myEdu.current = !isEmpty(myEdu.current) ? myEdu.current : "";
      myEdu.description = !isEmpty(myEdu.description) ? myEdu.description : "";

      this.setState({
        school: myEdu.school,
        degree: myEdu.degree,
        fieldofstudy: myEdu.fieldofstudy,
        from: myEdu.from,
        to: myEdu.to,
        current: myEdu.current,
        description: myEdu.description
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.editEducation(
      this.props.match.params.edu_id,
      eduData,
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
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={24} className={classes.paper}>
          <Grid item xs={12} justify="flex-start">
            <Link to="/dashboard">
              <Button className={classes.button} variant="contained">
                Go Back
              </Button>
            </Link>
            <Typography variant="display1" gutterBottom>
              Edit your education
            </Typography>
            <Typography variant="body1">
              Edit your education credentials for {this.state.school} or change
              any program details.
            </Typography>
            <Typography variant="caption">* = required fields</Typography>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                label="School"
                placeholder="* School"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
                error={errors.school}
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="* Degree or certification"
                label="Degree or certification"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="* Field of Study"
                label="Degree or certification"
                name="fieldofstudy"
                value={this.state.fieldofstudy}
                onChange={this.onChange}
                error={errors.fieldofstudy}
                fullWidth={true}
              />

              <TextFieldGroup
                label="From Date"
                name="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
                fullWidth={true}
              />

              <TextFieldGroup
                label="To Date"
                name="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? "disabled" : ""}
                fullWidth={true}
              />

              <FormControlLabel
                label="Current School"
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
                label="Program Description"
                placeholder="Program Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about the program"
                variant="outlined"
                multiline={true}
                fullWidth={true}
              />
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editEducation: PropTypes.func.isRequired,
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
    { editEducation, getCurrentProfile }
  )
)(withRouter(EditEducation));
