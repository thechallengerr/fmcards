const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Event = require('../models/Event');
const Player = require('../models/Player');
const mongoose = require('../../util/mongoose.js');

class EventController {


    //[GET] /events/:event_slug

    eventPlayers(req, res, next) {
        console.log(req.params.event_slug);
        var event;
        Event.findOne({ event_slug: req.params.event_slug }).then((e) => {
            event = e;
            Player.find({ event_slug: req.params.event_slug }).sort({ rating: -1 }).then((players) => {

                res.render('events/event-players',
                    {
                        players: mongooseToMultipleObjects(players),
                        event: mongooseToSignleObject(event)
                    })
            }).catch(next);
        })
    }
    //[GET] /events
    index(req, res, next) {
        Event.find().sort({ event_name: 1 })
            .then((events) => {
                console.log(events);
                res.render('events/events-show',
                    {
                        events: mongooseToMultipleObjects(events),
                    })

            })
            .catch(next);
    }

}


module.exports = new EventController();
