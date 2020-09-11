'use strict'
const mongoose =  require('mongoose');
const { Schema } = mongoose;
const path = require('path');
const fileSchema = new Schema ({
    product: [{
        upc: {type: String },
        alu: {type: String },
        size: {type: String },
    }],
    store_asigned:{type:String,default:0},
    status: {type: String},
    caurier:{type: String},
    store_created: {type: String },
    timestamp:{ type: String },
    timestampend:{ type: Date }

});

fileSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model('photo',fileSchema)