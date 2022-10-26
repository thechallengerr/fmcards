const { mongooseToMultipleObjects } = require('../../util/mongoose.js');

const Card = require('../models/Card');

class CardController {

    // [GET] /
    index(req, res, next) {

        Card.find()
            .then((cards) => {
                res.render('cards/cards',
                    {
                        cards: mongooseToMultipleObjects(cards),
                    })

            })
            .catch(next);
    }

    //[GET] /signup
    detail(req, res, next) {
        res.render("auth/sign_up");
    }



}


module.exports = new CardController();
