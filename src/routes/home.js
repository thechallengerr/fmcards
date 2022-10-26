const express = require('express');
const router = express.Router();
const cors = require('cors');
const HomeController = require('../app/controllers/HomeController');
router.use(cors());





router.get('/', HomeController.index);


module.exports = router;