import React, { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const styles = theme => ({
  root: {
    maxWidth: "100%"
  },
  text: {
    color: "#696969"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  button: {
    margin: theme.spacing.unit
  }
});

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      skills: "",
      status: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring Skill array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        skills: skillsCSV,
        status: profile.status,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      status: this.state.status,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <InputGroup
                placeholder="Twitter Profile URL"
                name="twitter"
                icon="fab fa-twitter"
                value={this.state.twitter}
                onChange={this.onChange}
                error={errors.twitter}
              />
              <InputGroup
                placeholder="Facebook Profile URL"
                name="facebook"
                icon="fab fa-facebook"
                value={this.state.facebook}
                onChange={this.onChange}
                error={errors.facebook}
              />
              <InputGroup
                placeholder="LinkedIn Profile URL"
                name="linkedin"
                icon="fab fa-linkedin"
                value={this.state.linkedin}
                onChange={this.onChange}
                error={errors.linkedin}
              />
              <InputGroup
                placeholder="Youtube Channel URL"
                name="youtube"
                icon="fab fa-youtube"
                value={this.state.youtube}
                onChange={this.onChange}
                error={errors.youtube}
              />
              <InputGroup
                placeholder="Instagram Page URL"
                name="instagram"
                icon="fab fa-instagram"
                value={this.state.instagram}
                onChange={this.onChange}
                error={errors.instagram}
              />
            </Grid>
          </Grid>
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Project Manager", value: "Project Manager" },
      { label: "Student", value: "Student" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Recruiter", value: "Recruiter" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={24} className={classes.paper}>
          <Grid item xs={12} justify="flex-start">
            <Link to="/dashboard" className="btn-btn-light">
              <Button variant="contained" className={classes.button}>
                Go Back
              </Button>
            </Link>
            <Typography variant="display1" gutterBottom>
              Edit Profile
            </Typography>
            <Typography variant="caption" className={classes.text}>
              * = required fields
            </Typography>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                type="text"
                label="* Profile Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your name, company or nickname etc."
                fullWidth={true}
              />
              <SelectListGroup
                placeholder="Status"
                type="text"
                label="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                error={errors.status}
                info="Give us an idea of your career status"
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="Company"
                type="text"
                label="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                info="Could be your own or one you work for."
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="Website"
                type="text"
                label="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Could be your own website or company website."
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="Location"
                type="text"
                label="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="City or city and state"
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="Skills"
                type="text"
                label="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please use comma separated values (eg. HTML,CSS,Java,etc)."
                fullWidth={true}
              />
              <TextFieldGroup
                placeholder="Github Username"
                type="text"
                label="Github Username"
                name="githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username"
                fullWidth={true}
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                type="text"
                label="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a bit about yourself"
                variant="outlined"
                multiline={true}
                fullWidth={true}
              />

              <Button
                variant="contained"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className={classes.button}
              >
                Add Social Network Links
              </Button>
              <Typography variant="caption">Optional</Typography>

              {socialInputs}
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default compose(
  withTheme(),
  withStyles(styles),
  connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
  )
)(withRouter(CreateProfile));
