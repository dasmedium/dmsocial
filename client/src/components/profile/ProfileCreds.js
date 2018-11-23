import React, { Component } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {
  Typography,
  withStyles,
  Grid,
  Card,
  CardContent,
  List,
  withTheme
} from "@material-ui/core";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  }
});

class ProfileCreds extends Component {
  render() {
    const { classes } = this.props;
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <Card key={exp._id} className={classes.card}>
        <CardContent>
          <Typography variant="title">{exp.company}</Typography>
          <Typography paragraph>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </Typography>
          <div>
            <Typography variant="subtitle1">Position: {exp.title}</Typography>
          </div>
          <div>
            {exp.locaton === "" ? null : (
              <Typography variant="subtitle1">
                Location: {exp.location}
              </Typography>
            )}
          </div>
          <div>
            {exp.description === "" ? null : (
              <Typography variant="subtitle1">
                Description: {exp.description}
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    ));

    const eduItems = education.map(edu => (
      <Card key={edu._id} className={classes.card}>
        <CardContent>
          <Typography variant="title">{edu.school}</Typography>
          <Typography paragraph>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}
          </Typography>
          <div>
            <Typography variant="subtitle1">Degree: {edu.degree}</Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              Field of Study: {edu.fieldofstudy}
            </Typography>
          </div>
          <div>
            {edu.description === "" ? null : (
              <Typography variant="subtitle1">
                Description: {edu.description}{" "}
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    ));

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h3">Experience</Typography>
            {expItems.length > 0 ? (
              <List className="list-group">{expItems}</List>
            ) : (
              <Typography paragraph>No Experience Listed</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">Education</Typography>
            {eduItems.length > 0 ? (
              <List className="list-group">{eduItems}</List>
            ) : (
              <Typography paragraph>No Education Listed</Typography>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withTheme()
)(ProfileCreds);
