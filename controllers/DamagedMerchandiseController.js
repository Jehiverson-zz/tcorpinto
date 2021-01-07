'use strict'

const DamagedMerchandise = require('../models/DamagedMerchandise');
const cloudinary = require('../cloudinary.config');

async function storeDamagedMerchandise(req,res) {
    let params = JSON.parse(req.body.data);
    let file = req.file;
    let damagedMerchandise = new DamagedMerchandise();
    if(params.upc != "" && params.alu != "" && params.size != "" && params.price != "" && params.damaged != "" && file){
        let result = await cloudinary.uploader.upload(file.path);
        console.log(result)
        damagedMerchandise.upc = params.upc;
        damagedMerchandise.alu = params.alu;
        damagedMerchandise.siz = params.size;
        damagedMerchandise.price = params.price;
        damagedMerchandise.damage = params.damaged;
        damagedMerchandise.store_created = params.store_created;
        damagedMerchandise.image = result.public_id;

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