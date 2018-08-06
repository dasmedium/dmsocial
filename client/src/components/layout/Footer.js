import React, { Component } from 'react'
import { Typography } from "../../../node_modules/@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};


function Footer(props) {
  
    const { classes } = props;
    return (
      <div className={classes.root}>
        
      <Typography variant="caption" gutterBottom>
      Copyright &copy; {new Date().getFullYear()} Das Medium Inc.</Typography>
    
      </div>
    )
  
}
export default withStyles(styles)(Footer)