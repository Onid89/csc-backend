import jwt from "jsonwebtoken";
export default function isTokenVerif(token) {
    try {
        const secretJWT = process.env.AUTH_TOKEN_SECRET || "";
        jwt.verify(token, secretJWT);
        return true;
    }
    catch (error) {
        return false;
    }
}
