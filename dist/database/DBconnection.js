import mongoose from "mongoose";
import "dotenv/config";
const url = process.env.DB_BASE_URL || "";
mongoose.set("strictQuery", true);
mongoose.connection.on("error", (err) => console.log("DB error", err));
mongoose.connection.on("connected", () => console.log("DB connected"));
mongoose.connection.on("close", () => {
    console.log("DB connection closed");
});
const doConnectBase = async () => {
    try {
        return await mongoose.connect(url);
    }
    catch (error) {
        console.error(error);
    }
};
export default doConnectBase;
