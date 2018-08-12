import React, { Component } from "react";
import { Typography } from "../../../node_modules/@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    maxWidth: "100%",
    backgroundColor: "#eee",
    paddingTop: "8px",
    paddingBottom: "8px"
  }
};

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid item xs={12} spacing={24}>
        <Typography variant="body1" align="center" className={classes.root}>
          Copyright &copy; {new Date().getFullYear()} Das Medium Inc.
        </Typography>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(Footer);
