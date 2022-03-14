const User = require("./User.model");

const newUser = {
  name: "newUser",
  age: 55,
};

// Update function (findByIdAndUpdate)  currentUserID - ID, update - update fields and values;
const updateCurrentUser = async (currentUserID, update = newUser) => {
  try {
    // Find User by id and update him by the update field (newUser as a default), upsert: if the currentUserId not found in DB -> create a new User with this fields (id and update);
    await User.findByIdAndUpdate(
      { _id: currentUserID },
      update,
      { upsert: true },
      (err, result) => {
        // If got some error, throw new Error to catch it;
        if (err) {
          throw new Error(err);
        }
        // If found user by id print 'Updated user' else print '_id not fount, create a new user ...';
        result
          ? console.log("Updated user: ", result)
          : console.log(
              `_id not found, create a new user document with name: '${update.name}', age: ${update.age} fields`
            );
        return result;
      }
    );
    // Handle errors;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = { updateCurrentUser };
