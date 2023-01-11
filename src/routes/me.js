const express = require('express');
const router = express.Router();
const cors = require('cors');
const MeController = require('../app/controllers/MeController');
router.use(cors());

router.get('/profile', MeController.profile);

router.get('/my-cards', MeController.myCards);

router.get('/', MeController.index);


module.exports = router;