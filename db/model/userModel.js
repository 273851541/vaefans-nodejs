const mongoose = require("mongoose");


let userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    nickname: {type: String, default: ''},
    avatar: {type: String, default: ''},
    sex: {type: Number, default: 1},
    age: {type: Number, default: 0},
    phone: {type: String, default: ''},
    created_at: {type: String, require: true},
    updated_at: {type: String, default: ''},
    // loves: {type: mongoose.Schema.Types.ObjectId, ref: 'loves'}
})

let Users = mongoose.model('users', userSchema);

module.exports = Users