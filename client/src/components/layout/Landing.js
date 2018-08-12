import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Background from "../common/Background";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import compose from "recompose/compose";

const styles = theme => ({
  container: {
    display: "flex",
    height: "85vh"
  }
});

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      title: "Tetoka"
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Background appTitle={this.state.title} />
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
