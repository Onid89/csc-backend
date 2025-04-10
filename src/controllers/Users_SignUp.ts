import User from "../models/User.js";
import errorHandler from "./errorHandler.js";
import { RequestCallback } from "./types.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export const signUpUser: RequestCallback = async (req, res) => {
  if (!req.body) {
    res.status(500).json({
      response: "Request body not found..",
    });
  }

  const { userName, userDisplayName, email, password, birthDate, avatarId } =
    req.body;

  const isUserExist = (await User.findOne({ email: email })) !== null;

  if (isUserExist) {
    res.status(500).json({
      response: "User already exist in the database...",
      isUserExist: isUserExist,
    });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDBObjectId = new ObjectId();

      const newUser = await User.create({
        _id: newDBObjectId,
        userName,
        userDisplayName,
        email,
        password: hashedPassword,
        birthDate,
        avatarId,
      });

      if (newUser) {
        res.status(200).json({
          status: true,
          userId: newUser._id.toString(),
          message: "User was added to the base!",
        });
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }
};