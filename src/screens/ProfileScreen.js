import React from "react";
import Nav from "../Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import PlanScreen from "./PlanScreen";
import "./profileScreen.css";

function ProfileScreen() {
  //const { email } = useSelector(selectUser);
  // console.log ('email ', email)
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?w=2000"
            alt=""
          />
          <div className="profileScreen__details">
            <h2>test@email.com</h2>

            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlanScreen />

              {/**that's how easy it is to sign out in firebase */}
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
