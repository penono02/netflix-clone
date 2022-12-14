import React, { useState } from "react";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <img
        className="loginScreen__logo"
        alt=""
        src="data:image/png;base64,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"
      />
      <button
        onClick={() => setSignIn(!signIn)}
        className="loginScreen__button"
      >
        Sign In
      </button>

      {signIn ? (
        <SignUpScreen />
      ) : (
        <div className="loginScreen__background">
          <div className="loginScreen__body">
            <h1>Unlimited films, TV programs and more.</h1>
            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
