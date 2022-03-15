const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema with some validations
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: [1, "Too short,min is 1 characters"],
      max: [32, "Too long,max is 32 characters"],
    },
    age: {
      type: Number,
      required: true,
      check(age) {
        if (age < 0) {
          throw new Error("Age must be a postive number");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
