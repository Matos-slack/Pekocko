const Sauce = require('../models/Sauce');

// Renoiv la nouvelle image aprés modification
module.exports = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        req.body.oldPictureName = sauce.imageUrl.split("/images/")[1];
        next();
    })
    .catch(error => res.status(500).json({message: error}));
} 