import jwt from "jsonwebtoken";
import User from "../models/User.js";
import errorHandler from "./errorHandler.js";
import { RequestCallback, UserType } from "./types.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import isTokenVerif from "./isTokenVerif.js";

const createToken = (id: string, lifeTime: number) => {
  const secretJWT = process.env.AUTH_TOKEN_SECRET || "";

  return jwt.sign({ id }, secretJWT, { expiresIn: lifeTime });
};

export const logInUser: RequestCallback = async (req, res) => {
  if (!req.body) {
    errorHandler(res, "Request body not found..");
  }

  const { email, password: inputPassword } = req.body;

  const user: UserType | null = (await User.findOne({ email: email })) || null;

  if (user === null) {
    errorHandler(res, "Login failed. Please Sign Up.");
  } else {
    try {
      const { password, _id, userName, userDisplayName, birthDate, avatarId } = user;

      if (typeof password !== "string") {
        return errorHandler(res, "Password is not a valid string");
      }

      const isVerifedPassword = await bcrypt.compare(inputPassword, password);

      if (!isVerifedPassword) {
        res.status(500).json({
          response: "Wrong password",
          isPasswordRight: false,
        });
      } else if (_id) {
        const tokenLifeTime = 24 * 60 * 60;
        const token = createToken(_id, tokenLifeTime);

        await User.findByIdAndUpdate({ _id: _id }, { token: token });

        res.status(200).json({
          userData: {
            userName,
            userDisplayName,
            birthDate,
            avatarId,
            _id,
          },
          isTokenVerif: isTokenVerif(token),
        });
      } else {
        errorHandler(res, "_id is not a valid string");
      }
    } catch (error) {
      errorHandler(res, error);
    }
  }
};
