import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorHandler from "./errorHandler.js";
import "dotenv/config";
const createToken = (id) => {
    const secretJWT = process.env.AUTH_TOKEN_SECRET || "";
    return jwt.sign({ id }, secretJWT);
};
export const getUsers = async (req, res) => {
    try {
        const response = await User.find({});
        res.status(200).json(response);
    }
    catch (error) {
        errorHandler(res, error);
    }
};
export const signUpUser = async (req, res) => {
    if (!req.body) {
        res.status(500).json({
            response: "Request body not found..",
        });
    }
    const { name, realName, email, password, birthDate, isAdult, isAcceptRules } = req.body;
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
                name,
                realName,
                email,
                password: hashedPassword,
                birthDate,
                isAdult,
                isAcceptRules,
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
export const logInUser = async (req, res) => {
    if (!req.body) {
        res.status(500).json({
            response: "Request body not found..",
        });
    }
    const { _id, email, password } = req.body;
    const user = (await User.findOne({ email: email })) || null;
    if (user === null) {
        res.status(500).json({
            response: "User doesn't exist in the database...",
            isUserExist: false,
        });
    }
    else {
        try {
            const isVerifedPassword = await bcrypt.compare(password, user.password);
            if (!isVerifedPassword) {
                res.status(500).json({
                    response: "Wrong password",
                    isPasswordRight: false,
                });
            }
            else {
                const token = createToken(_id);
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                res.status(200).json({
                    responseMessage: "Logged In successfully!",
                    user: { id: _id, email },
                    logedIn: true,
                    token: token
                });
            }
        }
        catch (error) {
            errorHandler(res, error);
        }
    }
};
