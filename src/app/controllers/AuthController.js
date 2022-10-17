const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const bcrypt = require('bcrypt');
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
            if (user === null) {
                console.log(user);
                User.create(formData, function (err) {
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
            console.log(user.password);


            user.comparePassword(formData.password, function (err, isMatch) {
                if (err) throw err;
                console.log(isMatch);
                if (isMatch) {
                    res.redirect('/');
                } else {
                    res.send('Username or password incorrect');
                }

            });
            // res.json(user[0]);

        });



    }

}


module.exports = new AuthController();
