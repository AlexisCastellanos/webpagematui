import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import Header2 from "./components/header2/header2.component";
import SingInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import emailTest from "./pages/emailTest/emailTest.component";
import Admin from "./pages/admin/admin.component";

import {
  auth,
  createUserProfileDocument,
  createUserProfileDocument2,
  dummy
} from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectUser, selectCurrentUser } from "./redux/user/user.selector";

const HatsPage = () => (
  <div>
    <h1>Hats</h1>
  </div>
);

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null
  //   };
  // }
  state = {
    access: false
  };
  unsubscribeFromAuth = null;
  unsubscribeFromAuth2 = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
  
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(
          snapShot => {
            console.log("snapShot.data()");
            console.log(snapShot.data().admin);
            this.setState({
              access: snapShot.data().admin
            });
          },
          () => {
            // console.log(this.state);
          }
        );

        userRef.onSnapshot(
          snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          },
          () => {
            // console.log(this.state);
          }
        );
      } else {
        setCurrentUser(userAuth);
      }
    });

    // this.unsubscribeFromAuth2 = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument2(userAuth);

    //     userRef.onSnapshot(
    //       snapShot => {
    //         setCurrentUser({
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         });
    //       },
    //       () => {
    //         console.log(this.state);
    //       }
    //     );
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    // });

    // dummy();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { setCurrentUser } = this.props;
    
    console.log("this.props.currentUser/");
    // debugger
    const admin = { ...this.state.access };
    console.log(this.props.currentUser);
    console.log("this.state.admin");
    console.log(this.state.access);

    let adminRoute=null;
    if(this.state.access){
      console.log("xthis.state.access true: "+this.state.access);
      adminRoute=<Route exact path="/admin" adminAccess={this.state.access} component={Admin} />
    }else{
      console.log("xthis.state.access false: "+this.state.access);
    }
    return (
      <div>
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
{/** <Header2 />*/}
        

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/email" component={emailTest} />
          {/*<Route path="/signin" component={SingInAndSignUpPage} />*/}

          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SingInAndSignUpPage />
              )
            }
          />
          {adminRoute}
          {/*
          <Route
            exact
            path="/admin"
            render={
              () =>
              //this.state.access=== true ? <Admin />  : <Redirect to="/" />
              // this.state.access=== true ? console.log("rendertruex"): console.log("renderfalsx")
              this.state.access=== false ? <Redirect to="/" /> : <Admin />
            }
          />
          */}
          <Route path="/hats" component={HatsPage} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
