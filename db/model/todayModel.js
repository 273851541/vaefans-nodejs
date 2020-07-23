const mongoose = require("mongoose");


let todaySchema = new mongoose.Schema({
    content:{type:String,require:true},
    songId:{type:Number,require:true},
    bgUrl:{type:String,require:true},
    title:{type:String,require:true},
    author:{type:String,require:true},
    "_userId":{type:mongoose.Schema.Types.ObjectId,require:true},
})

let Today = mongoose.model('todays',todaySchema);

module.exports = Today