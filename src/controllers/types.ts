import { Locals, Request, Response } from "express";
import { ParsedQs } from "qs";

export type RequestCallback = (
  req: Request<{}, any, any, ParsedQs, Record<string, any>>,
  res: Response<{}, Locals>
) => Promise<any>;

export type UserType = {
  _id?: string;
  userName: string;
  userDisplayName: string;
  email: string;
  password: string;
  birthDate: string;
  avatarId: boolean;
  creatingDate: string;
  updatingDate: string;
};

export type RoomParams = {
  _id?: string;
  id: string;
}

export type TokenVerifParams = {
  id: string;
};