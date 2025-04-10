import { Schema, model } from "mongoose";
const messageSchema = new Schema({
    _id: {
        type: String,
    },
    ownerId: {
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
const Message = model("Message", messageSchema);
export default Message;
