import Room from "../models/Room.js";
import errorHandler from "./errorHandler.js";
export const getRooms = async (req, res) => {
    try {
        const response = await Room.find({});
        res.status(200).json(response);
    }
    catch (error) {
        errorHandler(res, error);
    }
};
