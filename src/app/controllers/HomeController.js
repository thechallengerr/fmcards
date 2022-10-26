const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Event = require('../models/Event');
const Card = require('../models/Card');

class HomeController {


    //[GET] /home
    index(req, res, next) {
        var events;
        var cards = [];
        Card.find().then((cardsList) => {
            cards = cardsList
        })
        Event.find()
            .then((eventsList) => {

                res.render('home',
                    {
                        events: mongooseToMultipleObjects(eventsList),
                        cards: mongooseToMultipleObjects(cards)
                    }
                )

            }).catch(next);

    }
}

module.exports = new HomeController();
