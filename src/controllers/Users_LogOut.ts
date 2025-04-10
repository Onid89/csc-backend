import User from "../models/User.js";
import errorHandler from "./errorHandler.js";
import { Request, Response } from "express";
import { TokenVerifParams } from "./types.js";

const logOutUser = async (req: Request<TokenVerifParams>, res: Response) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate({ _id: id }, { token: '' });

    res.status(200).json({
      message: 'Loged Out Successful',
      isLogedOut: true,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default logOutUser;
