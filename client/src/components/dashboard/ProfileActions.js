import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const ProfileActions = props => {
  const { classes } = props;
  return (
    <div>
      <Button
        size="small"
        variant="contained"
        component={Link}
        to="/edit-profile"
        className={classes.button}
      >
        Edit Profile
      </Button>
      <Button
        size="small"
        variant="contained"
        component={Link}
        to="/add-education"
        className={classes.button}
      >
        Add Education
      </Button>
      <Button
        size="small"
        variant="contained"
        component={Link}
        to="/add-experience"
        className={classes.button}
      >
        Add Experience
      </Button>
    </div>
  );
};

ProfileActions.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ProfileActions);
