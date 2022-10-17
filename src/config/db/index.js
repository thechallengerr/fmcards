const mongoose = require('mongoose');

async function connect() {
    try {

        await mongoose.connect('mongodb://localhost:27017/my_web', {

        });
        console.log('Connected successfully');
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect };