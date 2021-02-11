/**
 * xMEME-Backend
 * created By - aparsh
 * February 2021
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const MemeSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    caption: {
        type : String,
        default: ""
    },
    url: {
        type : String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }    
},{
    timestamps: true
});

module.exports = mongoose.model('Meme',MemeSchema);
