const mongoose = require("mongoose");


let todaySchema = new mongoose.Schema({
    name:{type:String,require:true},
    key:{type:Number,require:true},
})

let Today = mongoose.model('blogs',todaySchema);


module.exports = Today