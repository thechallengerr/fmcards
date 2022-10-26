const express = require('express');
const router = express.Router();
const cors = require('cors');
const adminController = require('../app/controllers/AdminController');
router.use(cors());



router.get('/create-event', adminController.createEvent);
router.post('/store-event', adminController.storeEvent);
router.get('/create-card', adminController.createCard);
router.post('/store', adminController.storeCard);

router.get('/', adminController.index);


module.exports = router;