import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  menu: {
    width: 200
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class SelectListGroup extends Component {
  render() {
    const { classes } = this.props;
    const { name, value, error, info, onChange, options } = this.props;
    return (
      <div>
        <TextField
          select
          value={value}
          error={error}
          helperText={info}
          onChange={onChange}
          className={classes.TextField}
        >
          {options.map(option => (
            <MenuItem
              className={classes.menu}
              key={option.label}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectListGroup);
