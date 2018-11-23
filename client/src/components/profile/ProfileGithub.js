import React, { Component } from "react";
import compose from "recompose/compose";
import PropTypes from "prop-types";
import {
  Typography,
  withStyles,
  Grid,
  Card,
  CardContent,
  List,
  Chip,
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
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "2ee654ec73aa0e0177d7",
      clientSecret: "4e16c0108c927e42276495d8a2c8cdc2d763bff4",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      <Card key={repo.id} className={classes.card}>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="title">
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </Typography>
              <Typography paragraph>{repo.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                label={`Stars: ` + repo.stargazers_count}
                className={classes.chip}
                color="primary"
              />
              <Chip
                label={`Watchers: ` + repo.watchers_count}
                className={classes.chip}
                color="secondary"
              />
              <Chip
                label={`Forks: ` + repo.forks_count}
                color="default"
                className={classes.chip}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    ));

    return (
      <div className={classes.root}>
        <hr />
        <Typography variant="h4">Latest Github Repos</Typography>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withTheme()
)(ProfileGithub);
