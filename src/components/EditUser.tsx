import React, { useState } from "react";
import { saveUser } from "../services/getNewUser";
import { setItemToLocalStorage } from "../services/localStorage";
import currentUserStore from "../stores/CurrentUser.store";
import "./style.css";

const EnterdName: string = currentUserStore.currentUser.Name || "Enter name";
const EnterdAge: any = currentUserStore.currentUser.Age || "Enter age";

const EditUser = () => {
  const [NameIsValid, setNameIsValid] = useState(false);
  const [AgeIsValid, setAgeIsValid] = useState(false);
  const [Name, setName] = useState(EnterdName);
  const [Age, setAge] = useState(EnterdAge);

  // onChange name input;
  const nameInputChangeHandler = (event: any) => {
    // Get the value
    const nameValue = event.target.value;

    if (nameValue.length === 0) {
      currentUserStore.setNewName("");
    }
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

    if (Age.length === 0) {
      currentUserStore.setNewAge(0);
    }
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
  const deleteHandler = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("age");
    setName("");
    setAge(0);
    currentUserStore.setNewName("");
    currentUserStore.setNewAge(0);
  };

  return (
    <div className="Edit-container">
      <div>
        <div className="field Name-field-box">
          <input
            type="text"
            name="name"
            className={NameIsValid ? "invalid" : ""}
            placeholder={Name}
            value={Name !== "Enter name" ? Name : ""}
            onChange={nameInputChangeHandler}
          />
          {NameIsValid && (
            <div className="invalidDiv">
              Invalid must contains <b>only 1 to 10 characters!!!</b>
            </div>
          )}
        </div>
        <div className="field Age-field-box">
          <input
            type="text"
            name="age"
            className={AgeIsValid ? "invalid" : ""}
            placeholder={Age.toString()}
            value={Age !== "Enter age" ? Age : ""}
            onChange={ageInputChangeHandler}
          />
          {AgeIsValid && (
            <div className="invalidDiv">
              Invalid must contain <b>only digits !!!</b>
            </div>
          )}
        </div>
        <div className="field button-field-box">
          <button className="randomUserBtn" onClick={RandomUserHandler}>
            Random User
          </button>
        </div>
        <div className="field button-field-box">
          <button
            className="randomUserBtn"
            style={{ backgroundColor: "white", color: "black" }}
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
