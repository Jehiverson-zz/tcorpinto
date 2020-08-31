'use strict'

const TicketSystem = require("../models/TicketSystem");
const Store = require('../models/Store');
const TicketInmediate = require('../models/TicketInmediate');

function storeTicketSystemTransfer(req, res) {
    let params = req.body;
    let ticket = new TicketSystem();
    params.map(data => {
        //if (data.upc && data.alu && data.size && data.store && data.factura) {
            ticket.upc = data.upc;
            ticket.alu = data.alu;
            ticket.size = data.size;
            ticket.fact = data.factura;
            ticket.store_created = "tienda usuario";
            ticket.store_asigned = data.store;

            console.log(ticket);
        // } else {
        //     console.log('FALTAN DATOS')
        // }
    })
}

//Obtiene los tikets que se trasladan a otro sistema
async function getSystemTransfer(req, res) { //trassystem_show
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

async function getStore(req, res) {
    let result = await Store.find();
    return res.json({ result })
}

async function getTicketsInmediate(req,res){
    let result = await TicketInmediate.find().sort( { timestamp: -1 } );
    return res.json({ result })
}

module.exports = {
    storeTicketSystemTransfer,
    getTicketsInmediate,
    getSystemTransfer,
    getStore,
}