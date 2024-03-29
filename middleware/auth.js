import jwt, { decode } from "jsonwebtoken"

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, process.env.SECRET);
            req.userId = decodedData?.id;
            req.username = decodedData?.username;
        } 
        next();
    } catch (error) {
        return res.status(400).json({ error })
    }
}

export default auth;