const { mongooseToMultipleObjects } = require('../../util/mongoose.js');
const { generateToken, updateRefreshToken } = require('../../util/jwt.js');
const randToken = require('rand-token')
const jwt = require('jsonwebtoken')
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

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

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
                .send('Đăng nhập không thành công, vui lòng thử lại.');
        }

        let refreshToken = await generateToken(dataForAccessToken, accessTokenSecret, '7d'); // tạo 1 refresh token ngẫu nhiên
        if (!user.refreshToken) {
            console.log(' No refresh token')
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            user.updateOne(

                { $set: { refreshToken: refreshToken } },
                { new: true },
            )
                .then(doc => console.log(doc))
                .catch(err => console.log(err));
        } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = user.refreshToken;
        }

        return res.json({
            msg: 'Đăng nhập thành công.',
            accessToken,
            refreshToken,
            user,
        });
    }

    async refreshToken(req, res, next) {

    }
}


module.exports = new AuthController();
