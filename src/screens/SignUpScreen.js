import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth } from "../firebase";

import "./SignUpScreen.css";

function SignUpScreen() {
  const [isUser, setIsUser] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    // make sure you pass emailRef.current.value not the object emailRef.current, if not, you'll get FirebaseError: Firebase: Error (auth/network-request-failed).

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((user) => {
        if (user) setIsUser(true);
        console.log(emailRef.current.value);
        dispatch(login({ uid: user.uid, email: user.email }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const renderLogin = !isUser && (
    <div className={`signupScreen ${isUser ? "hideMe" : ""}`}>
      <h1>Sign In</h1>
      <form onSubmit={signIn}>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Sign In</button>

        <h4>
          <span className="signupScreen__gray">New to Netflix? </span>
          <span className="signupScreen__link" onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
  return renderLogin;
}

export default SignUpScreen;
