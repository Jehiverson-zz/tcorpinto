'use strict'

const BinnacleSaleByte = require('../models/BinnacleSaleByte');

//Obtiene los colaboradores
async function getBinnacleSale(req, res) { 
    let sales = await BinnacleSaleByte.find({
        store_creat:"Guess Oakland"
    }).sort({ date_created: -1 }).limit(50);
    
    return res.json({sales});
}

//Obtiene los colaboradores
async function getBinnacleSaleReport(req, res) { 
    let sales = await BinnacleSaleByte.find({
        store_creat:"Guess Oakland"
    }).sort({ date_created: -1 });
    
    return res.json({sales});
}

module.exports = {
    getBinnacleSale,
    getBinnacleSaleReport
}