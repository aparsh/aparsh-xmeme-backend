const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const MemeSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate()
      },
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
