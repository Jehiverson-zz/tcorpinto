'use strict'

const DamagedMerchandise = require('../models/DamagedMerchandise');

function storeDamagedMerchandise(req,res) {
    let params = req.body[0];
    let damagedMerchandise = new DamagedMerchandise();
    console.log(params)
    if(params.upc != "" && params.alu != "" && params.size != "" && params.price != "" && params.damaged != ""){
        damagedMerchandise.upc = params.upc;
        damagedMerchandise.alu = params.alu;
        damagedMerchandise.siz = params.size;
        damagedMerchandise.price = params.price;
        damagedMerchandise.damage = params.damaged;
        damagedMerchandise.store_created = params.store_created;

        damagedMerchandise.save((err, sotredDamaged)=>{
            if(err) return res.status(500).send({ message: 'No se pudo guardar la mercaderia dañada' })
            if(!sotredDamaged) return res.status(404).send({ message: 'Algo salío mal' })
            return res.status(200).send({ message: 'Registro almacenado exitosamente!', damaged: sotredDamaged });
        })
    }else{
        return res.status(500).send({ message : "Faltan datos" })
    }
}

async function getDamageMerchandise(req,res) {
    let message;
    let damagedMerchandise = await DamagedMerchandise.find({
        store_created: req.body.store
    })

    if(!damagedMerchandise){
        message = 'No se encontraron datos';
    }else{
        message = 'Datos encontrados';
    }
    return res.status(200).send({
        damaged : damagedMerchandise
    })
}

module.exports = {
    storeDamagedMerchandise,
    getDamageMerchandise
}