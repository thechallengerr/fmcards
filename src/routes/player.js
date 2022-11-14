const express = require('express');
const router = express.Router();
const cors = require('cors');
const PlayerController = require('../app/controllers/PlayerController');
router.use(cors());

router.get('/filter', PlayerController.filter);

router.post('/search', PlayerController.liveSearch);

router.get('/:id', PlayerController.detail);

router.get('/', PlayerController.index);


module.exports = router;