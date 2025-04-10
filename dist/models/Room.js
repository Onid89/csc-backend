import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
const messageSchema = new Schema({
    _id: {
        type: ObjectId,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    creatingDate: {
        type: String,
        require: true,
    },
});
const roomSchema = new Schema({
    _id: {
        type: ObjectId,
    },
    name: {
        type: String,
        require: true,
    },
    messages: [messageSchema],
}, { collection: "Rooms" });
const Room = model("Room", roomSchema);
export default Room;
