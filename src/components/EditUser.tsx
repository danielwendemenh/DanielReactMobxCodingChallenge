import React, { useState } from "react";
import { saveUser } from "../services/getNewUser";
import { setItemToLocalStorage } from "../services/localStorage";
import currentUserStore from "../stores/CurrentUser.store";
import "./style.css";

const initialEnterdName: string =
  currentUserStore.currentUser.Name || "Enter name";
const initialEnterdAge: any = currentUserStore.currentUser.Age || "Enter age";

const EditUser = () => {
  const [NameIsValid, setNameIsValid] = useState(false);
  const [AgeIsValid, setAgeIsValid] = useState(false);
  const [Name, setName] = useState(initialEnterdName);
  const [Age, setAge] = useState(initialEnterdAge);

  // onChange name input;
  const nameInputChangeHandler = (event: any) => {
    // Get the value
    const nameValue = event.target.value;

    setName(nameValue);
    //Check if valid
    if (
      !nameValue.match("^[a-zA-Z ]*$") ||
      !nameValue.length ||
      nameValue.length > 10
    ) {
      return setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }

    // save to local storage;
    setItemToLocalStorage("name", nameValue);

    // Check length < 10 character with uppercase for the first char;
    const name =
      nameValue.charAt(0).toUpperCase() + nameValue.toLowerCase().slice(1, 10);

    // Set the name in the Mobox;
    currentUserStore.setNewName(name);
  };

  // onChange age input
  const ageInputChangeHandler = (event: any) => {
    // Get the value from the event;
    const Age = event.target.value;

    setAge(Age);
    // Check if age is valid;
    let age = +Age >= 0 ? +Age : 0;
    age = Number(age.toString().slice(0, 2));

    // check validation
    if (!Age.match(/^\d+$/) || Age.length > 2 || !(+Age >= 0)) {
      return setAgeIsValid(true);
    } else {
      setAgeIsValid(false);
    }

    // save to local storage
    setItemToLocalStorage("age", Age);

    // Set the age in the Mobox;
    currentUserStore.setNewAge(+age >= 0 ? +age : 0);
  };

  // Fetch new user from the API;
  const RandomUserHandler = async () => {
    // getUserFetch();
    await saveUser();
    setName(currentUserStore.currentUser.Name);
    setAge(currentUserStore.currentUser.Age);
  };

  // Clear the local storage
  const clearInformationHandler = () => {
    currentUserStore.setNewName("");
    currentUserStore.setNewAge(0);
    localStorage.removeItem("name");
    localStorage.removeItem("age");
  };

  return (
    <div className="Edit-container">
      <div>
        <div className="field Name-field-box">
          <input
            type="text"
            name="name"
            className={NameIsValid ? "invalid" : ""}
            value={Name !== "Enter name" ? Name : ""}
            placeholder={Name}
            onChange={nameInputChangeHandler}
          />
          {NameIsValid && (
            <div className="invalidDiv">
              Invalid input!! - must contains <b>only 1 to 10 characters!</b>
            </div>
          )}
        </div>
        <div className="field Age-field-box">
          <input
            type="text"
            name="age"
            className={AgeIsValid ? "invalid" : ""}
            value={Age !== "Enter age" ? Age : ""}
            placeholder={Age.toString()}
            onChange={ageInputChangeHandler}
          />
          {AgeIsValid && (
            <div className="invalidDiv">
              Invalid input !!- must contain <b>only digits !</b>
            </div>
          )}
        </div>
        <div className="field button-field-box">
          <button className="generateUserBtn" onClick={RandomUserHandler}>
            Random User
          </button>
        </div>
        <div className="field button-field-box">
          <button
            className="generateUserBtn"
            style={{ backgroundColor: "white", color: "black" }}
            onClick={clearInformationHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
