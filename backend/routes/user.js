const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const checkDataSignup = require('../middlewares/dataSignUp');

router.post('/signup', checkDataSignup, userController.signup);
router.post('/login', userController.login);

module.exports = router;