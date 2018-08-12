import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import compose from "recompose/compose";

import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "../common/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Typography } from "../../../node_modules/@material-ui/core";

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
    color: theme.palette.text.secondary,
    height: "100%"
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <form onSubmit={this.onSubmit} className={classes.form}>
            <Typography className={classes.paper} variant="display1">
              Log In
            </Typography>
            <Typography className={classes.paper} variant="title">
              Sign in to your Tetoka account{" "}
            </Typography>
            <TextField
              className={classes.paper}
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              id="email-login"
              type="email"
            />

            <TextField
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
              id="password-login"
              type="password"
            />
            <Button
              variant="contained"
              type="submit"
              className={classes.button}
            >
              Log In
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
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
    { loginUser }
  )
)(Login);
