const { query } = require('express');
const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Player = require('../models/Player');
const CARD_PER_PAGE = 18;
class CardController {

    // [GET] /
    index(req, res, next) {
        console.log(req.query.page);
        let skip = (req.query.page - 1) * CARD_PER_PAGE
        let currentPage = req.query.page

        Promise.all([Player.find()
            .limit(CARD_PER_PAGE)
            .skip(skip)
            .sort({ createdAt: -1 }), Player.count()])
            .then(([players, totalPlayers]) => {

                res.render('cards/cards',
                    {
                        players: mongooseToMultipleObjects(players),
                        currentPage: currentPage,
                        totalPages: Math.ceil(totalPlayers / CARD_PER_PAGE),
                    })
            })
            .catch(next);
    }

    // GET /cards/:id
    detail(req, res, next) {
        const id = req.params.id;
        Player.findOne({ _id: id }).then((player) => {
            console.log(player)
            res.render('cards/card-detail', {
                player: mongooseToSignleObject(player)
            })
        }).catch(next);
        // res.render('cards/card-detail')
    }




}


module.exports = new CardController();
