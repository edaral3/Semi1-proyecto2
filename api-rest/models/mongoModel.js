const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : String,
    fullname : String,
    password : String,
    profileImage : String,
    modeBot : Boolean,
    friends : Array
});

const PublicationSchema = new Schema({
    image : String,
    description : String,
    date_iso : Date,
    idUser : String,
    labels : Array
});

module.exports.User = mongoose.model('User', UserSchema);
module.exports.Publication = mongoose.model('Publication', PublicationSchema);
