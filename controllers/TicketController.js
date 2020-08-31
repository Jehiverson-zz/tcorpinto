'use strict'

const TicketSystem = require("../models/TicketSystem");
const Store = require('../models/Store');
const TicketInmediate = require('../models/TicketInmediate');
const Moment = require('moment');
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
    const dataStore = [];
    let result = await TicketInmediate.find({},{
    upc: 1,
    alu: 1,
    siz: 1,

    upc1: 1,
    alu1: 1,
    siz1: 1,

    upc2: 1,
    alu2: 1,
    siz2: 1,

    upc3: 1,
    alu3: 1,
    siz3: 1,

    upc4: 1,
    alu4: 1,
    siz4: 1,

    upc5: 1,
    alu5: 1,
    siz5: 1,

    upc6: 1,
    alu6: 1,
    siz6: 1,

    upc7: 1,
    alu7: 1,
    siz7: 1,

    upc8: 1,
    alu8: 1,
    siz8: 1,

    upc9: 1,
    alu9: 1,
    siz9: 1,

    upc10: 1,
    alu10: 1,
    siz10: 1,

    upc11: 1,
    alu11: 1,
    siz11: 1,

    upc12: 1,
    alu12: 1,
    siz12: 1,

    upc13: 1,
    alu13: 1,
    siz13: 1,

    upc14: 1,
    alu14: 1,
    siz14: 1,

    upc15: 1,
    alu15: 1,
    siz15: 1,

    upc16: 1,
    alu16: 1,
    siz16: 1,

    upc17: 1,
    alu17: 1,
    siz17: 1,

    upc18: 1,
    alu18: 1,
    siz18: 1,

    upc19: 1,
    alu19: 1,
    siz19: 1,

    upc20: 1,
    alu20: 1,
    siz20: 1,

    upc21: 1,
    alu21: 1,
    siz21: 1,

    upc22: 1,
    alu22: 1,
    siz22: 1,

    upc23: 1,
    alu23: 1,
    siz23: 1,

    upc24: 1,
    alu24: 1,
    siz24: 1,

    upc25: 1,
    alu25: 1,
    siz25: 1,

    upc26: 1,
    alu26: 1,
    siz26: 1,

    upc27: 1,
    alu27: 1,
    siz27: 1,

    upc28: 1,
    alu28: 1,
    siz28: 1,

    upc29: 1,
    alu29: 1,
    siz29: 1,

    upc30: 1,
    alu30: 1,
    siz30: 1,

    upc31: 1,
    alu31: 1,
    siz31: 1,

    upc32: 1,
    alu32: 1,
    siz32: 1,

    upc33: 1,
    alu33: 1,
    siz33: 1,

    upc34: 1,
    alu34: 1,
    siz34: 1,

    upc35: 1,
    alu35: 1,
    siz35: 1,

    upc36: 1,
    alu36: 1,
    siz36: 1,

    upc37: 1,
    alu37: 1,
    siz37: 1,

    upc38: 1,
    alu38: 1,
    siz38: 1,

    upc39: 1,
    alu39: 1,
    siz39: 1,

    upc40: 1,
    alu40: 1,
    siz40: 1,

    upc41: 1,
    alu41: 1,
    siz41: 1,

    upc42: 1,
    alu42: 1,
    siz42: 1,

    upc43: 1,
    alu43: 1,
    siz43: 1,

    upc44: 1,
    alu44: 1,
    siz44: 1,

    upc45: 1,
    alu45: 1,
    siz45: 1,
    
    upc46: 1,
    alu46: 1,
    siz46: 1,

    upc47: 1,
    alu47: 1,
    siz47: 1,

    upc48: 1,
    alu48: 1,
    siz48: 1,

    upc49: 1,
    alu49: 1,
    siz49: 1,

    upc50: 1,
    alu50: 1,
    siz50: 1,
    fact: 1,
    fact_img:1,
    desc:1,
    store_asigned:1,
    status: 1,
    store_created: 1,
    email_asigned: 1,
    timestamp:1,
    timestampend:1 
    }).sort( { timestamp: -1 } );
    console.log(result);
    result.map((res) =>{
        let fecha = Moment(res.timestamp).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({
                        "fechaCreacion": fecha,
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tiendaCreacion": res.store_created,
                        "tiendaAsignacion": res.store_asigned,
                        "estado":res.status,
                        "destino": res.desc,
                        "upc": res.upc,
                        "alu": res.alu,
                        "siz": res.siz,
                        
                        "upc1": res.upc1,
                        "alu1": res.alu1,
                        "siz1": res.siz1,

                        "upc2": res.upc2,
                        "alu2": res.alu2,
                        "siz2": res.siz2,

                        "upc3": res.upc3,
                        "alu3": res.alu3,
                        "siz3": res.siz3,

                        "upc4": res.upc4,
                        "alu4": res.alu4,
                        "siz4": res.siz4,

                        "upc4": res.upc4,
                        "alu4": res.alu4,
                        "siz4": res.siz4,

                        "upc4": res.upc4,
                        "alu4": res.alu4,
                        "siz4": res.siz4,

                        "upc5": res.upc5,
                        "alu5": res.alu5,
                        "siz5": res.siz5,

                        "upc6": res.upc6,
                        "alu6": res.alu6,
                        "siz6": res.siz6,

                        "upc7": res.upc7,
                        "alu7": res.alu7,
                        "siz7": res.siz7,

                        "upc8": res.upc8,
                        "alu8": res.alu8,
                        "siz8": res.siz8,

                        "upc9": res.upc9,
                        "alu9": res.alu9,
                        "siz9": res.siz9,

                        "upc10": res.upc10,
                        "alu10": res.alu10,
                        "siz10": res.siz10,

                })
    })
    
    return res.json({ dataStore })
}

module.exports = {
    storeTicketSystemTransfer,
    getTicketsInmediate,
    getSystemTransfer,
    getStore,
}