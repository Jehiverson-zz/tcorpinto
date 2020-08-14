const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, required:true},
    user: {type: String, required:true},
    type: {type: String, required:true},
    password: {type: String, required:true},
    status: {type: String, required:true},
    createdAt:{type: Date, default: Date.now}
});

module.exports = model('users',UserSchema);