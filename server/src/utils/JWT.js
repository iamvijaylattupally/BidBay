import jwt from "jsonwebtoken";

export const createToken = (user) => {
    const accessToken = jwt.sign(user, process.env.JWT_SECRET_KEY); 
    return accessToken;
};

export const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) return res.status(400).json({ error: "User not authenticated" });
    else{
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(400).json({ error: "User not authenticated" });
            req.user = user;
            next();
        });
    }
};