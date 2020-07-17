const mongoose = require("mongoose");


let loveSchema = new mongoose.Schema({
    love_song:{type:Array,default:[]},
    love_video:{type:Array,default:[]},
    love_today:{type:Array,default:[]},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
})

let Love = mongoose.model('loves',loveSchema);

module.exports = Love