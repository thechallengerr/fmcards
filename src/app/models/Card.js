const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var Card = new Schema({
    playerImg: { type: String },
    playerName: { type: String },
    rating: { type: String },
    pos: { type: String },
    flag: { type: String },
    background: { type: String },
    event: { type: String },
}, {
    timestamps: true,
    autoIndex: true
});






module.exports = mongoose.model('Card', Card);
