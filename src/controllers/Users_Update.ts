import User from "../models/User.js";
import errorHandler from "./errorHandler.js";
import { Request, Response } from "express";

type Users_UpdateParams = {
  id: string;
  key: string
};

export const Users_Update = async (
  req: Request<Users_UpdateParams>,
  res: Response
) => {
  const { id, key } = req.params;
  const { newValue } = req.body;
  
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, { [key]: newValue});
    if (user) {
      res.status(200).json(true);
    } else {
      res.status(404).json({ error: "User not found or token is not valid" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};
