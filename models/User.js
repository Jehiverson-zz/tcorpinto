const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {type:String , unique:true, lowercase: true, required: true},
    password: {type: String,required:true},
    name:{type: String, required:true},
    status: {type:String,default: 'Active',required:true},
    store: {type:String,required:true},
    type:{type:String,default:'user'}

},{
    timestamps:true
});

module.exports = model('users',userSchema);