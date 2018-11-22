import React, { Component } from "react";
import compose from "recompose/compose";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  withStyles,
  withTheme
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

class AddEducation extends Component {
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

  componentWillReceiveProps(nextProps) {
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
    this.props.addEducation(eduData, this.props.history);
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
              <Button variant="contained" className={classes.button}>
                Go Back
              </Button>
            </Link>

            <Typography variant="display1" gutterBottom>
              Add education
            </Typography>

            <Typography variant="body2">
              Add any school or program you have attended.
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
                label="Degree or Certification"
                placeholder="* Degree or certification"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
                error={errors.degree}
                fullWidth={true}
              />
              <TextFieldGroup
                label="Field of Study"
                placeholder="* Field of Study"
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
                type="submit"
                variant="contained"
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

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
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
    { addEducation }
  )
)(withRouter(AddEducation));
