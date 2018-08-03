import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class ComposedTextField extends React.Component {
  

  
  render() {
    const { classes } = this.props;
    const {name, value, error, id, onChange, type} = this.props;

    return (
    
      <div >
        <FormControl className={classes.FormControl} error={error} aria-describedby={id}>
          <InputLabel htmlFor="name-error">{name}</InputLabel>
          <Input id={id} value={value} onChange={onChange} name={name} type={type}/>
          <FormHelperText id={id}>{error ? error : ""}</FormHelperText>
        </FormControl>
      </div>
     
    );
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string.isRequired
  
};

export default withStyles(styles)(ComposedTextField);