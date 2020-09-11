'use strict'

const mongoose =  require('mongoose');
const { Schema } = mongoose;
const path = require('path');
const fileSchema = new Schema ({

    product: [
        {
            upc: {type: String },
            alu: {type: String },
            size: {type: String },
        }
    ],
    manager: {type: String,default:'Error'},
    name:{type:String,default:0},
    inv_val:{type:String,default:'Sin Factura'},
    store_created: {type: String },
    status:{type: String },
    timestamp:{ type: Date, default: Date.now },
    timestampend:{ type: Date, default: Date.now }

});

fileSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model('ext_retreat',fileSchema)