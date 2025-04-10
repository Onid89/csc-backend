import { Response } from "express";

const errorHandler = (res: Response, error: unknown): void => {
  res.status(500).json({ errorMessage: error });
}

export default errorHandler;