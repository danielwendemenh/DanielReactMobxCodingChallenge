import React from "react";
import UserDetails from "./components/DisplayUser";
import EditUser from "./components/EditUser";
import "./components/style.css";

const App = () => {
  return (
    <div className="login-Container">
      <UserDetails />
      <br />
      <EditUser />
    </div>
  );
};

export default App;
