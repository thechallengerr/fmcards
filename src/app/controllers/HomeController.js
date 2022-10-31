const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Event = require('../models/Event');
const Player = require('../models/Player');

class HomeController {


    //[GET] /home
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

module.exports = new HomeController();
