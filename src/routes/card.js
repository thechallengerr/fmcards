const express = require('express');
const router = express.Router();
const cors = require('cors');
const CardController = require('../app/controllers/CardController');
router.use(cors());


router.post('/search', CardController.liveSearch);

router.get('/:id', CardController.detail);

router.get('/', CardController.index);


module.exports = router;