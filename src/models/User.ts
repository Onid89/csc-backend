import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  userDisplayName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  birthDate: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    require: false,
  },
  avatarId: {
    type: String,
    require: true,
  },
  creatingDate: {
    type: String,
    default: new Date().toISOString(),
    require: true,
  },
  updatingDate: {
    type: String,
    default: new Date().toISOString(),
    require: true,
  },
  },
  { collection: 'Users' });

const User = model("User", userSchema);

export default User;