import React from "react";
import { observer } from "mobx-react";
import currentUserStore from "../stores/CurrentUser.store";
import getNewUser from "../services/getNewUser";

// Get the currentUser details from the MobX and display
const DisplayUser = () => {
  // Get the currentUser details from the MobX;
  const name = currentUserStore.currentUser.Name;
  const age = currentUserStore.currentUser.Age;

  if (name === "" || name === null) {
    getNewUser();
  }

  return <>{`${name}  ${age}`}</>;
};

const ObservedDisplayUserName = observer(DisplayUser);

const UserDetails = () => {
  return (
    <div className="display-container">
      <h1>
        <ObservedDisplayUserName />
      </h1>
    </div>
  );
};
export default UserDetails;
