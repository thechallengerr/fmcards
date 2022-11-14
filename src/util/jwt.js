const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const User = require('../app/models/User.js');
// const db = require('../config/db');
// db.connect();
exports.generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token: ${error}`);
        return null;
    }
};

exports.updateRefreshToken = async (username, refreshToken) => {
    try {
        User.findOneAndUpdate(
            { username: username },
            { $set: { refreshToken: refreshToken } }
        )
        console.log('add refresh token successfully');
        return true;
    } catch {
        return false;
    }
};