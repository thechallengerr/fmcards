const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User');

class AuthController {

    // [GET] /
    index(req, res, next) {
        res.render("auth/sign_in");
    }

    //[GET] /signup
    signup(req, res, next) {
        res.render("auth/sign_up");
    }

    //[POST] /create
    createUser(req, res, next) {
        const formData = req.body;
        console.log(formData);
        User.findOne({ username: formData.username }, (err, user) => {
            if (err) throw err;
            if (user === null) {
                if (err) throw err;
                User.create({ username: formData.username, password: formData.password }, function (err) {
                    if (err) return handleError(err);

                });
                res.redirect('/');
            } else {
                res.send('Username already in use');
            }
        })



    }

    //[POST] auth/signin
    signin(req, res, next) {
        const formData = req.body;
        console.log(formData);

        User.findOne({ username: formData.username }, function (err, user) {
            if (err) throw err;
            console.log(user);
            if (!user) {
                res.send('Username not found');
                return;
            }
            // bcrypt.genSalt(10, function (err, salt) {

            //     bcrypt.hash(formData.password, salt, function (err, hash) {
            //         console.log(hash);
            //         console.log(user.password);

            //     });
            // });
            bcrypt.compare(formData.password, user.password, (err, isMatch) => {
                console.log(isMatch);
                if (!isMatch) {
                    res.send('Password incorrect');
                    return;
                } else {
                    res.redirect('/');
                }
            });
        });

    }

}


module.exports = new AuthController();
