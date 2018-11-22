import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class TextAreaFieldGroup extends Component {
  render() {
    const { classes } = this.props;
    const {
      name,
      placeholder,
      value,
      error,
      info,
      onChange,
      multiline,
      rowsMax,
      fullWidth,
      variant
    } = this.props;
    return (
      <div>
        <TextField
          multiline={multiline}
          variant={variant}
          fullWidth={fullWidth}
          rowsMax={rowsMax}
          helperText={info}
          error={error}
          className={classes.textField}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
  multiline: PropTypes.bool,
  rowsMax: PropTypes.string,
  fullWidth: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextAreaFieldGroup);
