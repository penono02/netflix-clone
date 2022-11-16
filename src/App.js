import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import SignUpScreen from "./screens/SignUpScreen";

function App() {
  //const user = null; we then use our selector to update user
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    //if you recall, you must always clear/reset useEffect to prevent memory leak. Good things about onAuthStateChanged is that it gives you something called unscribe which we can use to reset
    //for this, we attach when the component mounts and detach when it unmounts

    return unsubscribe; //that means our performance will not be affected.
  });

  return (
    <div className="App">
      <Router>
        {!user ? (
          <SignUpScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
