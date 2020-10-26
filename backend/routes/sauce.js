  
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const likingAlgo = require('../middlewares/likeSystem');
const getOldPicture = require('../middlewares/PictureAfterUpdate');
const checkLike = require('../middlewares/checkUserLike');        // Disable option to prevent liking or disliking our own sauces
const checkCreateForm = require('../middlewares/checkCreateSauce');
const deletePictureNoValidForm = require('../middlewares/deleteInvalidPicture');


router.post('/', auth, multer, checkCreateForm, sauceCtrl.createSauce, deletePictureNoValidForm);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/:id/like', auth, likingAlgo, checkLike, sauceCtrl.likeOneSauce);
router.put('/:id', auth, multer, getOldPicture, checkCreateForm, sauceCtrl.modifyOneSauce, deletePictureNoValidForm);
router.delete('/:id', auth, sauceCtrl.deleteSauce);


module.exports = router;