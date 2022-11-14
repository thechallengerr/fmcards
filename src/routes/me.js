const express = require('express');
const router = express.Router();
const cors = require('cors');
const MeController = require('../app/controllers/MeController');
const { Router } = require('express');
router.use(cors());


router.get('/my-cards', MeController.myCards);

router.get('/', MeController.index);


module.exports = router;