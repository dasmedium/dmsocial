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
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  List,
  ListItem,
  Divider,
  Drawer,
  ListItemText,
  ListItemIcon,
  withStyles
} from "@material-ui/core";

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
  },
  list: {
    width: 250
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      profile: {},
      drawer: false
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

  toggleDrawer = (drawer, open) => () => {
    this.setState({
      drawer: open
    });
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
    const { profile } = this.props.profile;

    const sideList = (
      <div className={classes.list}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    function ListItemLinkProfile(props) {
      const { primary, to } = props;

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
            {isAuthenticated ? (
              <div>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.toggleDrawer("drawer", true)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : null}

            <Drawer
              open={this.state.drawer}
              onClose={this.toggleDrawer("drawer", false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer("drawer", false)}
                onKeyDown={this.toggleDrawer("drawer", false)}
              >
                {sideList}
              </div>
            </Drawer>
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
                  <Avatar
                    alt="avatar"
                    src={user.avatar}
                    className={classes.avatar}
                  />
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
