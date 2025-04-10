import Room from "../models/Room.js";
import { ObjectId } from "mongodb";
import errorHandler from "./errorHandler.js";
import User from "../models/User.js";
export const addMessageToRoom = async (req, res) => {
    const { id } = req.params;
    const { message, owner: ownerId } = req.body;
    const newDBObjectId = new ObjectId();
    try {
        const user = await User.findOne({ _id: ownerId });
        const newMessage = {
            _id: newDBObjectId,
            owner: user?.displayName,
            message: message,
        };
        const room = await Room.findOne({ id: id });
        if (room) {
            const updatedMessages = [...room.messages, newMessage];
            const messagesAmount = updatedMessages.length;
            await Room.findOneAndUpdate({ id: id }, { messages: updatedMessages });
            await Room.findOneAndUpdate({ id: id }, { capacity: messagesAmount });
            const secondRequestRoom = await Room.findOne({ id: id });
            const secondRequestMessages = secondRequestRoom?.messages;
            secondRequestMessages
                ? res
                    .status(200)
                    .json(secondRequestMessages[secondRequestMessages?.length - 1]._id)
                : res.status(404).json("Message not found");
        }
    }
    catch (error) {
        errorHandler(res, error);
    }
};
