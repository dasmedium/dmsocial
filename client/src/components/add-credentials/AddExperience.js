import React, { Component } from "react";
import compose from "recompose/compose";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";
import {
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Paper,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(profileData, this.props.history);
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
            <Link to="/dashboard" className="btn-btn-light">
              <Button variant="contained" className={classes.button}>
                Go Back
              </Button>
            </Link>
            <Typography variant="display1" align="center">
              Add Experience
            </Typography>
            <Typography variant="body1" align="center">
              Add any past job, position or project role that you have had in
              the past or current
            </Typography>
            <Typography variant="caption">* = required fields</Typography>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
              <TextFieldGroup
                placeholder="* Job Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
              />

              <TextFieldGroup
                label="From Date"
                name="from"
                type="date"
                value={this.state.from}
                onChange={this.onChange}
                error={errors.from}
              />

              <TextFieldGroup
                label="To Date"
                name="to"
                type="date"
                value={this.state.to}
                onChange={this.onChange}
                error={errors.to}
                disabled={this.state.disabled ? "disabled" : ""}
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
                placeholder="Job Description"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell us about this position"
                multiline={true}
                variant="outlined"
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
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
    { addExperience }
  )
)(withRouter(AddExperience));
