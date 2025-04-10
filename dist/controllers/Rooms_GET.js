import Room from "../models/Room.js";
import errorHandler from "./errorHandler.js";
export const getRooms = async (req, res) => {
    try {
        const roomsList = await Room.find();
        const updatePromises = roomsList.map((room) => {
            const capacity = room.messages.length ? room.messages.length : 0;
            return Room.findByIdAndUpdate(room._id, { capacity: capacity });
        });
        await Promise.all(updatePromises);
        res.status(200).json(await Room.find({}));
    }
    catch (error) {
        errorHandler(res, error);
    }
};
