import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

import compose from "recompose/compose";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  button: {
    margin: theme.spacing.unit,
    color: "#D50000"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
    color: "#A9A9A9"
  },
  text: {
    color: "#696969"
  }
});

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const { classes } = this.props;
    const education = this.props.education.map(edu => (
      <TableRow key={edu._id}>
        <TableCell>{edu.school}</TableCell>
        <TableCell>{edu.degree}</TableCell>
        <TableCell>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </TableCell>
        <TableCell>
          <Link to={`/edit-education/${edu._id}`}>
            <EditIcon className={classes.icon} />
          </Link>
        </TableCell>
        <TableCell>
          <DeleteOutline
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className={classes.icon}
          >
            Delete
          </DeleteOutline>
        </TableCell>
      </TableRow>
    ));

    return (
      <div className={classes.root}>
        <Typography className={classes.text} variant="h4" gutterBottom>
          Education Credentials
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>School</TableCell>
              <TableCell>Degree</TableCell>
              <TableCell>Years</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{education}</TableBody>
        </Table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withTheme(),
  withStyles(styles),
  connect(
    null,
    { deleteEducation }
  )
)(Education);
