import User from "../models/User.js";
import errorHandler from "./errorHandler.js";
import bcrypt from "bcrypt";
export const signUpUser = async (req, res) => {
    if (!req.body) {
        res.status(500).json({
            response: "Request body not found..",
        });
    }
    const { userName, userDisplayName, email, password, birthDate, avatarId } = req.body;
    const isUserExist = (await User.findOne({ email: email })) !== null;
    if (isUserExist) {
        res.status(500).json({
            response: "User already exist in the database...",
            isUserExist: isUserExist,
        });
    }
    else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                userName,
                userDisplayName,
                email,
                password: hashedPassword,
                birthDate,
                avatarId,
            });
            res.status(200).json({
                response: "User was added to the base!",
                user: newUser,
            });
        }
        catch (error) {
            errorHandler(res, error);
        }
    }
};
