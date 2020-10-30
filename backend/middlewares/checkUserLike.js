const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();
const cleTok = process.env.cleToken;

module.exports = (req,res,next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jsonWebToken.verify(token,`${cleTok}`);
        const userId = decodedToken.userId;
        if(req.body.sauce.userId!==userId) {
            next();
        } else {
            res.status(403).json({error: 'Vous n\'êtes pas autorisé à liker ou disliker votre sauce !'});
        }
    } catch {
        res.status(400).json({error: new Error('Requete Invalide!')});
    }
}