
// Regex sécurité pour entrée d'une sauce
const controleRegex = [/^[\wéèàïîêûçàôë]{2}[\w\s-'éèàêïîûñçàôë]{0,48}$/i,
                    /^[\wéèàêïîûçàôë]{2}[\w\s-'éèàêïîûçñàôë]{0,40}$/i,
                    /^[\wéèàïîêûçàôë]{2}[\w\s-éèàêûïîçàñôë,?;.!:/"'()]{0,1098}$/i,
                    /^[a-zA-Zéèàêïîûçàôë]{2}[a-zA-Z\s-'éèàêïîñûçàôë]{0,48}$/i,
                    /^([1-9]|10)$/];

module.exports = (req,res,next) => {
    let compteur = 0;
    if(req.body.sauce) {
        sauceObjet = JSON.parse(req.body.sauce);
    } else {
        sauceObjet = { ...req.body };
    }
    for (const key in sauceObjet) {
        if (sauceObjet.hasOwnProperty(key)&&compteur<5) {
            if(!controleRegex[compteur].test(sauceObjet[key])) {
                req.body.errorMessage = "Le champ "+key+ " ne semble pas valide !";  
                next();
            }  
        }
        compteur++;    
    }
    next();
}