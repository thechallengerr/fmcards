const express = require('express');
const router = express.Router();
const cors = require('cors');
const CardController = require('../app/controllers/CardController');
router.use(cors());

router.delete('/:id', CardController.delete)
router.put('/:id/update', CardController.update)
router.get('/:id/edit', CardController.edit)
router.post('/get-clubs', CardController.getClubs)
router.get('/get-backgrounds', CardController.getBackgrounds)
router.post('/get-nations', CardController.getNations)
router.post('/save', CardController.save);
router.get('/', CardController.index);



module.exports = router;