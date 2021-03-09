'use strict'

const DamagedMerchandise = require('../models/DamagedMerchandise');
const cloudinary = require('../cloudinary.config');
const moment = require('moment');

async function storeDamagedMerchandise(req,res) {
    let params = JSON.parse(req.body.data);
    let file = req.file;
    let damagedMerchandise = new DamagedMerchandise();
    if(params.upc != "" && params.alu != "" && params.size != "" && params.price != "" && params.damaged != "" && file){
        let result = await cloudinary.uploader.upload(file.path);

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

async function getDataReport(req, res) {
    let query;
    if(req.body.role == "admin"){
        if(req.body.store){
            query = {
                timestamp:{
                    $gt:  moment(req.params.date_start).utcOffset('+00:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                    $lt:  moment(req.params.date_end).utcOffset('+00:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                },
                store_created: req.body.store
            }
        }else{
            query = {
                timestamp:{
                    $gt:  moment(req.params.date_start).utcOffset('+00:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                    $lt:  moment(req.params.date_end).utcOffset('+00:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                }
            }
        }
    }else{
        query = {
            timestamp:{
                $gt:  moment(req.params.date_start).utcOffset('+00:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                $lt:  moment(req.params.date_end).utcOffset('+00:00').format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            },
            store_created: req.body.store
        }
    }
    await DamagedMerchandise.find(query).exec((err, result) => {
        if(err) return res.status(500).send('Algo salío mal')
        if(!result) return res.status(404).send({ message: 'No existen datos en el rango de fechas especificado' })
        return res.status(200).send({data: result});
    });
}

module.exports = {
    storeDamagedMerchandise,
    getDamageMerchandise,
    getDataReport
}