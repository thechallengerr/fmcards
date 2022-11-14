const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


var Card = new Schema({
    player_img: { type: String },
    player_name: { type: String },
    rating: { type: String },
    position: { type: String },
    flag: { type: String },
    background: { type: String },
    club: { type: String },
    createdBy: { type: Schema.Types.ObjectId },
}, {
    timestamps: true,
    autoIndex: true
});

Card.plugin(mongoose_delete)

module.exports = mongoose.model('Card', Card);
