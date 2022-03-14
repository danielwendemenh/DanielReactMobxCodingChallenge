import { getItemFromLocalStorage } from "../services/localStorage";
import UserModel from "../models/User.model";

// Local storage values
const nameLocalStorage = getItemFromLocalStorage("name");
const ageLocalStorage = getItemFromLocalStorage("age");

// Initial values from local storage (if exist)
const initialName = nameLocalStorage
  ? nameLocalStorage.charAt(0).toUpperCase() +
    nameLocalStorage.toLowerCase().slice(1, 10)
  : null;
const initialAge = ageLocalStorage ? ageLocalStorage : 0;

class CurrentUserStore {
  // Create a new instance to UserModel
  currentUser = new UserModel(initialName, initialAge);

  setNewName(name: string) {
    this.currentUser.Name = name;
  }

  setNewAge(age: number) {
    this.currentUser.Age = age;
  }
}

const currentUserStore = new CurrentUserStore();

export default currentUserStore;
