import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../actions/profileActions";
import compose from "recompose/compose";

//Material imports
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      profile: {}
    };

    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.setState({ profile: nextProps.profile.profile });
    }
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { profile } = this.state;

    function ListItemLinkProfile(props) {
      const { primary } = props;

      return (
        <li>
          <MenuItem button component={Link} to={`/profile/${profile.handle}`}>
            <ListItemText primary={primary} />
          </MenuItem>
        </li>
      );
    }

    function MenuItemLink(props) {
      const { primary, onClick } = props;
      return (
        <li>
          <MenuItem button onClick={onClick}>
            <ListItemText primary={primary} />
          </MenuItem>
        </li>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Tetoka
            </Typography>
            {isAuthenticated ? (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <div>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <ListItemLinkProfile primary="Profile" />

                    <MenuItemLink
                      primary="Log out"
                      onClick={this.onLogoutClick}
                    />
                  </Menu>
                </div>
              </div>
            ) : (
              <div>
                <Button className={classes.button} href="/login">
                  <Typography>Login</Typography>
                </Button>
                <Button href="/register">
                  <Typography>Sign Up</Typography>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile, getCurrentProfile }
  )
)(Navbar);
