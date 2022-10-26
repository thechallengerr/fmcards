const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Event = require('../models/Event');

class EventController {



    eventPlayers(req, res, next) {

    }
    //[POST] /events
    index(req, res, next) {
        Event.find()
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
