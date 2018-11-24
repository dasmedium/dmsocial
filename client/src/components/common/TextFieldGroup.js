import React, { Component } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { withStyles, withTheme } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  menu: {
    width: 200
  }
});

class TextFieldGroup extends Component {
  render() {
    const { classes } = this.props;
    const {
      name,
      placeholder,
      value,
      label,
      error,
      info,
      type,
      onChange,
      disabled,
      helperText,
      variant,
      fullWidth
    } = this.props;
    return (
      <div>
        <TextField
          type={type}
          className={classes.textField}
          error={error}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          helperText={helperText}
          label={label}
          variant={variant}
          fullWidth={fullWidth}
        />
      </div>
    );
  }
}

TextFieldGroup.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  variant: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text",
  variant: "standard"
};

export default compose(
  withTheme(),
  withStyles(styles)
)(TextFieldGroup);
