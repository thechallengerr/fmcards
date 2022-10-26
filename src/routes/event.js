const express = require('express');
const router = express.Router();
const cors = require('cors');
const EventController = require('../app/controllers/EventController');
router.use(cors());




router.get('/:event_slug', EventController.eventPlayers);

router.get('/', EventController.index);


module.exports = router;