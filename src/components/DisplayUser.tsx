import React from "react";
import { observer } from "mobx-react";
import currentUserStore from "../stores/CurrentUser.store";
import getNewUser from "../services/getNewUser";

// Get the currentUser details from the MobX and display
const DisplayUser = () => {
  // Get the currentUser details from the MobX;
  const name = currentUserStore.currentUser.Name;
  const age = currentUserStore.currentUser.Age;

  // Fetch new user if name === null, if name !== null it's will be equal to something from local storage; (when the component loaded at the first time it's will be null)
  // Easily -> if there is nothing in local storage;
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
