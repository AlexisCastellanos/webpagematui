import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header2.styles.scss";
// const admin = { ...this.props.currentUser };

class Header2 extends React.Component {
  // const Header = ({ currentUser, hidden }) => (
  render() {
    const admin = { ...this.props.currentUser };
    console.log("admin");
    console.log(admin);

    return (
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="options">
          {this.props.currentUser ? (
            <React.Fragment>
              <p style={{ padding: "10px 15px" }}>
                Signed in as, {admin.displayName}
              </p>
              {this.props.currentUser.admin ? (
                <Link className="option" to="/admin">
                  ADMIN
                </Link>
              ) : null}
            </React.Fragment>
          ) : (
            <p>Signed in as a Guest</p>
          )}

          <Link className="option" to="/shop">
            SHOP
          </Link>
          <Link className="option" to="/shop">
            CONTACT
          </Link>
          {this.props.currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          ) : (
            <Link className="option" to="/signin">
              SIGN IN
            </Link>
          )}

          <CartIcon />
        </div>
        {this.props.hidden ? null : <CartDropdown />}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header2);
