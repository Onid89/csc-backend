import isTokenVerif from "./loginTokenVerify.js";
export const getUsers = async (req, res) => {
    const { token } = req.body;
    res.status(200).json(isTokenVerif(token));
};
