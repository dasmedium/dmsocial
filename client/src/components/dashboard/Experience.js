import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

import compose from "recompose/compose";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Tab } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "95%",
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
  }
});

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const { classes } = this.props;
    const experience = this.props.experience.map(exp => (
      <TableRow key={exp._id}>
        <TableCell>{exp.company}</TableCell>
        <TableCell>{exp.title}</TableCell>
        <TableCell>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </TableCell>
        <TableCell>
          <Link to={`/edit-experience/${exp._id}`} className="btn btn-light">
            <i className="far fa-edit text-info mr-1" />
            Edit
          </Link>
        </TableCell>
        <TableCell>
          <Button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className={classes.button}
            variant="contained"
            size="small"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));

    return (
      <div className={classes.root}>
        <h4 className="mb-4">Experience Credentials</h4>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Years</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>{experience}</TableBody>
        </Table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withTheme(),
  withStyles(styles),
  connect(
    null,
    { deleteExperience }
  )
)(Experience);
