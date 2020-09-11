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
    fact: {type:String},
    fact_img:{type:String},
    desc:{type:String,default:0},
    store_asigned:{type:String,default:0},
    status: {type: String},
    store_created: {type: String },
    email_asigned: {type: String },
    timestamp:{ type: Date, default: Date.now },
    timestampend:{ type: Date }

});

fileSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model('ticket_inmediate',fileSchema)