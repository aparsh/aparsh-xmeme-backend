var mongoose = require('mongoose');
//require('mongoose-type-email');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    username: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email: {
        type: String, 
        default:''
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);