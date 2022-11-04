const mongoose = require('mongoose');

async function connect() {
    try {

        await mongoose.connect('mongodb+srv://hoangnd171:MkFlpEPktq4cE4xX@cluster0.hcozx.mongodb.net/fmcards', {

        });
        console.log('Connected successfully');
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect };