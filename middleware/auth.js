import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ Error: "Token doesnt exist" });
    }

    
    const token = authHeader.split(' ')[1];

    const JWT_SECRET = process.env.JWT_SECRET || 'Frase';
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ Error: "Invalid Token" });
        }

        req.user = {
            id: decodedToken.userId 
        };
        next();
    });
};
export default authMiddleware;