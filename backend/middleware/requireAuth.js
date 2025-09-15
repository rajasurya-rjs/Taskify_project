import jwt from 'jsonwebtoken';
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({message:'Unauthorized'});
    }
    const token = authorization.split(' ')[1]+"";
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // normalized user object with id to be used by controllers
        req.user = { id: decoded.id };
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
export default requireAuth;
