const mongoose = require('mongoose');
const db = require('../config/user_db');

const { Schema } = mongoose;

const nestedSchema = new Schema({
    power: Number,
    vehicle: Number,
    publicTransport: Number,
    flight: Number,
    food: Number,
    secondary: Number,
    startDate: {
                type: Date,
                default: Date.now
            },
    endDate: {
                type: Date,
                default: Date.now
            },
})

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },
    carbonData: [nestedSchema],
})


const UserModel = db.model('USSR',userSchema);

module.exports = UserModel;