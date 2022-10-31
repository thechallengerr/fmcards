const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Card = require('../models/Card');
const Event = require('../models/Event');
const Player = require('../models/Player.js');

class adminController {

    //[POST] admin/store
    storeEvent(req, res, next) {
        console.log(req.body);
        Event.create(req.body)
            .then(() => res.redirect('/admin'))
            .catch(next);


    }


    //[GET] admin/create-card
    createEvent(req, res, next) {
        res.render('admin/create-event');


    }

    //[POST] admin/store
    storeCard(req, res, next) {
        console.log(req.body);
        Card.create(req.body)
            .then(() => res.redirect('/admin'))
            .catch(next);


    }


    //[GET] admin/create-card
    createCard(req, res, next) {
        res.render('admin/create-card');


    }

    //[GET] /admin
    index(req, res, next) {
        Player.find().sort({ createdAt: -1 }).limit(12).then((playerList) => {
            Event.find().limit(10)
                .then((eventsList) => {

                    res.render('home',
                        {
                            events: mongooseToMultipleObjects(eventsList),
                            players: mongooseToMultipleObjects(playerList)
                        }
                    )

                })
        }).catch(next);
    }

}


module.exports = new adminController();
