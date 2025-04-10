import express from "express";
import { getRooms } from "../controllers/Rooms_GET.js";

const roomsRouter = express.Router();

roomsRouter.get("/", getRooms);

export default roomsRouter;
