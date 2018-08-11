import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import backgroundpic from "./backgroundpic.png";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  image: {
    maxWidth: "100%"
  }
});

class Background extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <img src={backgroundpic} alt="background" className={classes.image} />
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Background);
