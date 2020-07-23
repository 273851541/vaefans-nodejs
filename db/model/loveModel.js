const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let loveSongSchema = new Schema({
    loveList:{type:Array,require:true},
    _userId:{type:String,require:true}
})

let loveVideoSchema = new mongoose.Schema({
    "id":  {type:Number,require:true},
    "name":  {type:String,require:true},
    type: {type:String,require:true},
    "_userId":{type:mongoose.Schema.Types.ObjectId,require:true},
})

let loveTodaySchema = new mongoose.Schema({
    loveList:{type:Array,require:true},
    _userId:{type:mongoose.Schema.Types.ObjectId,require:true}
})

let LoveSong = mongoose.model('loveSongs',loveSongSchema);
let LoveVideo = mongoose.model('loveVideos',loveVideoSchema);
let LoveToday = mongoose.model('loveTodays',loveTodaySchema);

module.exports = {
    LoveSong,
    LoveVideo,
    LoveToday,
}
