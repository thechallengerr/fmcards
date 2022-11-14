const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');
const jwt = require('jsonwebtoken');

const Event = require('../models/Event');
const Player = require('../models/Player');
const Card = require('../models/Card');
const mongoose = require('../../util/mongoose.js');

class MeController {

    index(req, res, next) {
        res.send('index page')
    }
    //[POST] /me/my-cards
    async myCards(req, res, next) {
        if (!req.cookies.accessToken) {
            res.status(501).json({ error: 'Bạn cần đăng nhập để xem trang này' });
            return;
        }
        var data = await jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET)
        var cards = await Card.find({
            createdBy: data.payload.id,
            deleted: false,
        })
        res.render('me/my-card', {
            cards: mongooseToMultipleObjects(cards)
        })

    }

    async edit(req, res, next) {

    }


}


module.exports = new MeController();
