const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const passwordHash = require('password-hash');
var User = new Schema({
    username: { type: String, lowercase: true },
    password: { type: String, lowercase: true },
    email: { type: String, lowercase: true },
    refreshToken: { type: String, },
    userAvatar: { type: String, default: "https://png.pngtree.com/png-clipart/20210129/ourlarge/pngtree-man-default-avatar-png-image_2813122.jpg" },

}, {
    timestamps: true,
});


User.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    var hash = passwordHash.generate(user.password, { algorithm: 'sha512' });
    user.password = hash;
    next();

});


module.exports = mongoose.model('User', User);
