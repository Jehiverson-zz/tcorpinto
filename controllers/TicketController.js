'use strict'

const TicketSystem = require("../models/TicketSystem");
const Store = require('../models/Store');

//Obtiene los tikets que se trasladan a otro sistema
async function getSystemTransfer(req, res) { //trassystem_show
    console.log(req)
    let ticketSystem = await TicketSystem.find({
        status: 'Pendiente',
        $or: [
            { store_created: "Meatpack Web" },
            { store_asigned: "Meatpack Web" }
        ]
    }).sort({ timestamp: -1 });

    let store = await Store.find({ name: "Meatpack Web" });
    let store_list;

    store.forEach(async (element) => {
        store_list = await Store.find({
            sbs: element.sbs,
            name: { $ne: "Meatpack Web" }
        })
    })

    return res.json({
        ticketSystem,
        store_list,
    });
}

module.exports = {
    getSystemTransfer
}