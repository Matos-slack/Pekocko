const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');


// Hash le mdp, crée un nouveau user avec le nouveau mdp crypté et le mail, puis enrigistre dans la BDD
exports.signup = (req,res,next) => { 
    bcrypt.hash(req.body.password,10)
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({message: "Votre compte a bien été enregistré!"}))
        .catch(error => res.status(400).json({message:error}));
    })
    .catch(error => res.status(500).json({message:error}));
};

exports.login = (req,res,next) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if(!user) {
            return res.status(401).json({message:"Cette adresse email n'existe pas!"})
        }
        bcrypt.compare(req.body.password,user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({message:"Le mot de passe est incorrect!"})
            }
            return res.status(200).json({
                userId: user._id,
                token: jsonWebToken.sign(
                    { userId: user._id },
                    'Tho7KYoLPa10DeUx70pO_rF9DYvc72O0J',
                    { expiresIn: '1h' }
                )
            });
        })
        .catch(error => res.status(500).json({message:"Une erreur est survenue: "+error}));
    })
    .catch(error => res.status(500).json({message:"Cette adresse est introuvable en base de données: "+error}));  
};


