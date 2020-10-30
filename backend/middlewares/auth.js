const jwt = require('jsonwebtoken');
require('dotenv').config();
const cleTok = process.env.cleToken;

// Verifie le Token envoyé par le front, token valable ? userId = req.user_id ?
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${cleTok}`); // Fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée 
    const userId = decodedToken.userId;  // Extrait l'ID utilisateur de notre token
    if (req.body.userId && req.body.userId !== userId) {  // Si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. S'ils sont différents, nous générons une erreur
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};