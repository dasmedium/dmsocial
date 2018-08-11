import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Background from "../common/Background";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";

const styles = theme => ({
  container: {
    display: "flex",
    width: 200
  }
});

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Background>
          <h1 className="display-3 mb-4">Tetoka</h1>
          <p className="lead"> Education Social Network</p>
          <hr />
          <Link to="/register" className="btn btn-lg btn-info mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-lg btn-light">
            Login
          </Link>
        </Background>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(Landing);
