import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";
import SignUpScreen from "./screens/SignUpScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  const navigate = useNavigate();
  //const user = null; we then use our selector to update user

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
        navigate("/login");
      }
    });
    //if you recall, you must always clear/reset useEffect to prevent memory leak. Good things about onAuthStateChanged is that it gives you something called unscribe which we can use to reset
    //for this, we attach when the component mounts and detach when it unmounts

    return () => unsubscribe(); //that means our performance will not be affected.
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/profile" element={<ProfileScreen />} />
        <Route exact path="/login" element={<SignUpScreen />} />
        <Route exact path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
