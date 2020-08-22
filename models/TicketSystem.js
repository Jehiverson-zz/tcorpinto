'use strict'

const mongoose =  require('mongoose');
const { Schema } = mongoose;
const path = require('path');
const fileSchema = new Schema ({

    upc: {type: String },
    alu: {type: String },
    siz: {type: String },

    fact:  {type: String},
    status: {type: String},
    retailn:{type: String},
    store_created: {type: String },
    store_asigned: {type: String },
    timestamp:{ type: Date, default: Date.now },
    timestampend:{ type: Date }

});

fileSchema.virtual('uniqueId')
    .get(function(){
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model('ticket_tras_system',fileSchema)