const express = require('express');
const router = express.Router();
const cors = require('cors');
const AuthController = require('../app/controllers/AuthController');
router.use(cors());


router.get('/signup', AuthController.signup);
router.post('/create', AuthController.createUser);
router.post('/signin', AuthController.signin);

router.get('/', AuthController.index);


module.exports = router;