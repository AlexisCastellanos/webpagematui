import React, { useState } from "react";
// import { Link } from "react-router-dom";
import clsx from "clsx";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CartIcon from "../cart-icon/cart-icon.component";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import Cart from "../cart/cart.component";
import TemporaryDrawertempo from "../temporary-drawer/temporary-drawer.component";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(2),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Emmanuel",
      anchorEl: null,
      open: false,
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleMenu = (event) => {
    console.log("handleMenu:" + this.state.anchorEl);
    this.setState({ anchorEl: event.currentTarget });
    // setAnchorEl(event.currentTarget);
  };

  handleClose = (event) => {
    // console.log("handleClose:"+this.state.anchorEl);
    // setAnchorEl(event.currentTarget);
  };
  render() {
    const admin = { ...this.props.currentUser };
    const { classes } = this.props;

    var showMenu = { ...this.state.anchorEl };
    console.log("{...this.state.anchorEl}");
    console.log(showMenu);
    const open = Boolean(showMenu);
    console.log("open");
    console.log(open);
    return (
      <div
        // className={classes.root}
        className="root"
      >
        <AppBar style={{ background: "#28282a" }} position="static">
          <Toolbar>
            <Link
              variant="subtitle1"
              underline="none"
              // className={clsx(classes.rightLink)}
              href="/"
            >
              <Logo className="logo" />
            </Link>
            {/*
            <IconButton
              edge="start"
              // className={classes.menuButton}
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          */}
            {/*
            <Typography
              variant="h6"
              noWrap
              // className={classes.title}
              className="title"
            >
              News
            </Typography>
            */}
            <div className="right">
              {this.props.currentUser ? (
                <React.Fragment>
                  <Link
                    style={{ color: "#f50057" }}
                    component="button"
                    variant="subtitle1"
                    underline="none"
                    className={clsx(classes.rightLink)}
                    href="/premium-themes/onepirate/sign-in/"
                  >
                    {`Signed in as, ${admin.displayName}`}
                  </Link>
                  {this.props.currentUser.admin ? (
                    <Link
                      variant="subtitle1"
                      underline="none"
                      className={clsx(classes.rightLink)}
                      href="/admin"
                    >
                      {"Admin"}
                    </Link>
                  ) : null}
                </React.Fragment>
              ) : (
                <Link
                  style={{ color: "#f50057" }}
                  component="button"
                  variant="subtitle1"
                  underline="none"
                  className={clsx(classes.rightLink)}
                  href="/premium-themes/onepirate/sign-in/"
                >
                  {`Signed in as a Guest`}
                </Link>
              )}
              <Link
                variant="subtitle1"
                underline="none"
                className={clsx(classes.rightLink)}
                href="/shop"
              >
                {"Shop"}
              </Link>

              <Link
                variant="subtitle1"
                underline="none"
                className={clsx(classes.rightLink)}
                href="/contact"
              >
                {"Contact"}
              </Link>

              {this.props.currentUser ? (
                <Link
                  variant="subtitle1"
                  underline="none"
                  className={clsx(classes.rightLink)}
                  href="/"
                  onClick={() => auth.signOut()}
                >
                  {"Sign Out"}
                </Link>
              ) : (
                <Link
                  variant="subtitle1"
                  underline="none"
                  className={clsx(classes.rightLink)}
                  href="/signin"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/**
            <CartIcon />
            */}

            <Cart />
            {/*<TemporaryDrawertempo />*/}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
export default connect(mapStateToProps, null)(withStyles(useStyles)(Header));

// export default withStyles(useStyles)(Header);
