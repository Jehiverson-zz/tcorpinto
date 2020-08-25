'use strict'

const BinnacleSaleByte = require('../models/BinnacleSaleByte');
const Moment = require('moment');
//Obtiene los colaboradores
async function getBinnacleSale(req, res) { 
    let sales = await BinnacleSaleByte.find({
        store_creat:"Guess Oakland"
    }).sort({ date_created: -1 }).limit(50);
    
    return res.json({sales});
}

//Obtiene los colaboradores
async function getBinnacleSaleReport(req, res) { 
    const dataStore = [];
    let sales = await BinnacleSaleByte.find().sort({ date_created: -1 }).limit(500);

    sales.map((res) =>{
        dataStore.push({"fechaCreacion": Moment(res.date_created).format('DD-MM-YYYY'), "tienda": res.store_creat, "data":res})
    })

    
    
    
    return res.json({dataStore});
}

module.exports = {
    getBinnacleSale,
    getBinnacleSaleReport
}