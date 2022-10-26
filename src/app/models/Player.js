/* */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt');

var Player = new Schema({
    playerThumb: { type: String },
    nationThumb: { type: String },
    event: { type: String },
    displayName: { type: String },
    playerRating: { type: String },
    playerPosition: { type: String },
    stats: {
        pace: {
            sprintSpeed: { type: Number },
            acceleration: { type: Number },
        },
        shooting: {
            positioning: { type: Number },
            pinishing: { type: Number },
            shotPower: { type: Number },
            longShot: { type: Number },
            volleys: { type: Number },
            penalties: { type: Number },
        },
        passing: {
            vision: { type: Number },
            crossing: { type: Number },
            freekick: { type: Number },
            shortPass: { type: Number },
            longPass: { type: Number },
            curve: { type: Number },
        },
        agility: {
            agility: { type: Number },
            balance: { type: Number },
            reactions: { type: Number },
            ballControl: { type: Number },
            dribbling: { type: Number },
        },
        defend: {
            interception: { type: Number },
            heading: { type: Number },
            marking: { type: Number },
            standingTackle: { type: Number },
            slidingTackle: { type: Number },
        },
        physical: {
            jumping: { type: Number },
            strength: { type: Number },
            aggression: { type: Number },
        },
    },
}, {
    timestamps: true,
    autoIndex: true
});

module.exports = mongoose.model('Player', Player);
