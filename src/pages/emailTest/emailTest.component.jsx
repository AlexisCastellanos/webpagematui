import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./emailTest.css";

import { selectUser, selectCurrentUser } from "../../redux/user/user.selector";
import { setCurrentUser } from "../../redux/user/user.actions";

import * as firebase from "firebase/app";
import { auth, functions } from "../../firebase/firebase.utils";

const emailTest = ({ currentUser }) => {
  return (
    <div className="emailTest">
      <h2>SendGrid Transactional Email with React</h2>
      {currentUser ? signOutUI(currentUser) : signInUI()}
 
    </div>
  );
};

function signInUI() {
  return (
    <div>
      <button
        onClick={() =>
          auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }
      >
        SignIn with Google
      </button>
    </div>
  );
}

function signOutUI(user) {
  return (
    <div>
      <p>{JSON.stringify(user)}</p>

      <hr />

      <button onClick={() => sendEmail()}>
        Send Email with Callable Function
      </button>
      <button onClick={() => auth.signOut()}>SignOut</button>
    </div>
  );
}
function sendEmail() {
  const callable = functions.httpsCallable("genericEmail");
  return callable({
    text: "Sending email with React and SendGrid is fun!",
    subject: "Email from React"
  }).then(console.log);
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(emailTest);
