const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Card = require('../models/Card');
const Event = require('../models/Event');

class adminController {

    //[POST] admin/store
    storeEvent(req, res, next) {
        console.log(req.body);
        Event.create(req.body)
            .then(() => res.redirect('/admin'))
            .catch(next);


    }


    //[POST] admin/create-card
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


    //[POST] admin/create-card
    createCard(req, res, next) {
        res.render('admin/create-card');


    }

    //[POST] auth/signin
    index(req, res, next) {
        Card.find()
            .then((cards) => {
                res.render('admin/management',
                    {
                        cards: mongooseToMultipleObjects(cards),
                    })

            })
            .catch(next);
    }

}


module.exports = new adminController();
