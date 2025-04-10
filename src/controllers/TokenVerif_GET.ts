import User from "../models/User.js";
import errorHandler from "./errorHandler.js";
import isTokenVerif from "./isTokenVerif.js";
import { Request, Response } from "express";

type TokenVerifParams = {
  id: string;
};

export const TokenVerifGET = async (
  req: Request<TokenVerifParams>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    if (user && typeof user.token === "string") {
      const { token, userName, userDisplayName, avatarId, _id } = user;
      const response = {
        tokenVerif: isTokenVerif(token),
        userName,
        userDisplayName,
        avatarId,
        _id,
      };

      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "User not found or token is not valid" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
