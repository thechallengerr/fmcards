const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt');

var User = new Schema({
    username: { type: String },
    password: { type: String, lowercase: true },
    userAvatar: { type: String },

}, {
    timestamps: true,
});


User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    const salt = bcrypt.genSaltSync(10)
    bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });

});

User.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};




module.exports = mongoose.model('User', User);
