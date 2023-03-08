const express = require('express');
const router = express.Router();
const cors = require('cors');
const MeController = require('../app/controllers/MeController');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
router.use(cors());

router.post('/update-avatar', upload.single('avatar'), MeController.updateAvatar);
router.get('/profile', MeController.profile);

router.get('/my-cards', MeController.myCards);

router.get('/', MeController.index);


module.exports = router;