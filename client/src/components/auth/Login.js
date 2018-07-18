import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import compose from "recompose/compose";

import TextFieldGroup from "../common/TextFieldGroup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
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
        <div className={classes.wrapper}>
          <Paper className={classes.paper}>
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your Tetoka account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </Paper>
        </div>
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
