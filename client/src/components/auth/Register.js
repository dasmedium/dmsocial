import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { registerUser } from "../../actions/authActions";
import TextField from "../common/TextField";
import {
  FormHelperText,
  Typography,
  Grid
} from "../../../node_modules/@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "85vh"
  },
  form: {
    paddingTop: "30px",
    textAlign: "center",
    padding: theme.spacing.unit * 2,
    height: "100%"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    // Just testing out the form with console log before Redux
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <form noValidate onSubmit={this.onSubmit} className={classes.form}>
            <Typography variant="display2" align="center">
              Sign Up
            </Typography>
            <Typography variant="subheading" align="center">
              Create your Tetoka Account
            </Typography>
            <TextField
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextField
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <FormHelperText className={classes.paper}>
              "This site uses Gravatar so if you want a profile image, use a
              Gravatar email"
            </FormHelperText>

            <TextField
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <TextField
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <Button
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { registerUser }
  )
)(withRouter(Register));
