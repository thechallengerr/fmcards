const { query } = require('express');
const { mongooseToMultipleObjects, mongooseToSignleObject } = require('../../util/mongoose.js');

const Player = require('../models/Player');
const Nation = require('../models/Nation');
const League = require('../models/League');
const Event = require('../models/Event');
const CARD_PER_PAGE = 18;
class CardController {

    // [GET] /
    index(req, res, next) {
        console.log(req.query);
        let skip = (req.query.page - 1) * CARD_PER_PAGE
        let currentPage = req.query.page || 1;
        let positions = [
            'LW', 'LF', 'ST', 'CF', 'RW', 'RF', 'LM', 'CAM', 'CM', 'CDM', 'RM', 'LWB', 'LB', 'CB', 'RB', 'RWB', 'GK'
        ]
        Promise.all([Player.find().limit(CARD_PER_PAGE).skip(skip).sort({ rating: -1 }),
        Player.count(),
        Nation.find(),
        League.find(),
        Event.find()])
            .then(([players, totalPlayers, nations, leagues, events]) => {

                res.render('cards/cards',
                    {

                        players: mongooseToMultipleObjects(players),
                        currentPage: currentPage,
                        totalPages: Math.ceil(totalPlayers / CARD_PER_PAGE),
                        nations: mongooseToMultipleObjects(nations),
                        leagues: mongooseToMultipleObjects(leagues),
                        events: mongooseToMultipleObjects(events),
                        positions: positions,
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
