import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import backgroundpic from "./backgroundpic.png";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "relative"
  },
  image: {
    height: "700px",
    width: "100%",
    opacity: "0.7"
  },
  type: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  container: {
    position: "absolute",
    top: "55%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Background extends Component {
  render() {
    const { classes } = this.props;
    const { appTitle } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <img src={backgroundpic} alt="background" className={classes.image} />
          <Typography variant="display4" className={classes.type} align="left">
            {appTitle}
          </Typography>
          <div className={classes.container}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              href="/login"
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="scondary"
              className={classes.button}
              href="/register"
            >
              SignUp
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

Background.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Background);
