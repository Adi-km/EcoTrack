const mongoose = require('mongoose');
const db = require('../config/user_db');

const { Schema } = mongoose;

const nestedSchema = new Schema({
    food: Number,
    paper: Number,
    gas: Number,
    others: Number,
    electricity: Number,

    Date: {
                type: Date,
                default: Date.now
            },

})



const campusSchema = new Schema({
    location: {
        type: String,
        lowercase: true,
        unique: true,
    },
    carbonData: [nestedSchema],
})



const CampusModel = db.model('CampusData',campusSchema);

module.exports = CampusModel;