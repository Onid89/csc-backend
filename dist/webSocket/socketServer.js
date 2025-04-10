import Room from "../models/Room.js";
import { ObjectId } from "mongodb";
export default async function webSocketServer(server) {
    server.on("connection", async (socket) => {
        try {
            const rooms = await Room.find()
                .populate([
                {
                    path: "messages.owner",
                    select: "userDisplayName avatarId",
                },
            ])
                .lean();
            socket.emit("rooms", rooms);
        }
        catch (error) {
            console.error(error);
        }
        socket.on("addNewMessage", async (messageData) => {
            try {
                const { roomId, message, owner } = messageData;
                const newDBObjectId = new ObjectId();
                const date = new Date().toLocaleString("ru-RU");
                const newMessage = {
                    _id: newDBObjectId,
                    owner,
                    message: message,
                    creatingDate: date,
                };
                const room = await Room.findOneAndUpdate({ _id: roomId }, { $push: { messages: newMessage } }, { new: true });
                if (room) {
                    const secondRequestRooms = await Room.find()
                        .populate([
                        {
                            path: "messages.owner",
                            select: "userDisplayName avatarId"
                        },
                    ])
                        .lean();
                    if (secondRequestRooms) {
                        server.emit("rooms", secondRequestRooms);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        socket.on("updateRooms", async () => {
            try {
                const rooms = await Room.find()
                    .populate([
                    {
                        path: "messages.owner",
                        select: "userDisplayName avatarId",
                    },
                ])
                    .lean();
                server.emit("rooms", rooms);
            }
            catch (error) {
                console.error("Ошибка при обновлении комнат:", error);
            }
        });
    });
}
