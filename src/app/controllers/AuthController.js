const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { generateToken, updateRefreshToken } = require('../../util/jwt.js');
const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

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
            if (user) {

                res.status(401).send('Username already in use');
            } else {
                User.create({ username: formData.username, password: formData.password, email: formData.email, email: formData.email, userAvatar: '' }, function (err) {
                    if (err) return handleError(err);

                });
                res.redirect('/');
            }
        })
    }

    //[POST] auth/signin
    async signin(req, res, next) {

        console.log(req.body);

        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(401).json({ error: 'Username not found. Please check again' });
            return;
        }
        const isPasswordValid = passwordHash.verify(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid password' });
        }

        const accessTokenLife = `${process.env.ACCESS_TOKEN_LIFE}`;
        const accessTokenSecret = `${process.env.ACCESS_TOKEN_SECRET}`;

        const dataForAccessToken = {
            id: user._id,
        };
        const accessToken = await generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );
        console.log(accessToken);
        if (!accessToken) {
            return res
                .status(401)
                .send('Login failed');
        }

        let refreshToken = await generateToken(dataForAccessToken, accessTokenSecret, '7d'); // t???o 1 refresh token ng???u nhi??n
        if (!user.refreshToken) {
            console.log(' No refresh token')
            // N???u user n??y ch??a c?? refresh token th?? l??u refresh token ???? v??o database
            user.updateOne(

                { $set: { refreshToken: refreshToken } },
                { new: true },
            )
                .then(doc => console.log(doc))
                .catch(err => console.log(err));
        } else {
            // N???u user n??y ???? c?? refresh token th?? l???y refresh token ???? t??? database
            refreshToken = user.refreshToken;
        }

        return res.json({
            msg: '????ng nh???p th??nh c??ng.',
            accessToken,
            refreshToken,
            user,
        });
    }

    async refreshToken(req, res, next) {

    }

    async getCurrentUser(req, res, next) {
        if (!req.cookies.accessToken) {
            res.status(501).json({ error: 'B???n c???n ????ng nh???p ????? c?? th??? l??u th??? n??y' });
            return;
        }
        var data = await jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET)
        var currentUser = await User.findById(data.payload.id);
        res.json(currentUser);
    }
}


module.exports = new AuthController();
