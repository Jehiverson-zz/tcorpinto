'use strict'

const Certificate = require('../models/Giftcard');
const Store = require('../models/Store');
const Moment = require('moment');

async function store_certificate(req, res) {
    let params = req.body;
    let Certificate_ = new Certificate();
    let daten = Moment().tz('America/Guatemala')._d;
    //Se genera en el nuevo certificado
    Certificate_.no_cer = params[0].no_cer,
        Certificate_.name_cer = params[0].name_cer,
        Certificate_.val_cer = params[0].val_cer,
        Certificate_.date_start_cer = params[0].date_start_cer,
        Certificate_.date_end_cer = params[0].date_end_cer,
        Certificate_.obs_cer = params[0].obs_cer,
        Certificate_.meatpack = params[0].meatpack,
        Certificate_.sperry = params[0].sperry,
        Certificate_.quiksilver = params[0].quiksilver,
        Certificate_.guess = params[0].guess,
        Certificate_.colehaan = params[0].colehaan,
        Certificate_.diesel = params[0].diesel,
        Certificate_.status = 'Activo',
        Certificate_.date_created = daten

    await Certificate_.save(async (err, storedCertificate) => {
        if (err) return res.status(500).send({ message: 'Error al crear el certificado', error: err })
        if (!storedCertificate) return res.status(404).send({ message: 'Error algo salio mal al crear el certifiado' })
        return res.status(200).send({ message: 'El certificado a sido creado', certificate: storedCertificate })
    })
}

async function getCertificatesActives(req, res) {
    console.log("STORE:", req.body.store)
    let store = await Store.findOne({ name: req.body.store }, (err, result) => {
        if (err) { console.log(err); return; }
        return result
    })
    let subsidiaria = store.sbs;
    console.log("SBS:", subsidiaria)
    //muestra los ticket de cada tienda
    let result;
    switch (subsidiaria) {
        case 'Meatpack':
            result = await Certificate.find({ meatpack: 'Verificado', status: 'Activo' }).sort({ timestamp: -1 });
            break;
        case 'Sperry':
            result = await Certificate.find({ sperry: 'Verificado', status: 'Activo' }).sort({ timestamp: -1 });
            break;
        case 'Quiksilver':
            result = await Certificate.find({ quiksilver: 'Verificado', status: 'Activo' }).sort({ timestamp: -1 });
            break;
        case 'Guess':
            result = await Certificate.find({ guess: 'Verificado', status: 'Activo' }).sort({ timestamp: -1 });
            break;
        case 'Arrital':
            result = await Certificate.find({ colehaan: 'Verificado', status: 'Activo' }).sort({ timestamp: -1 });
            break;
        case 'Diesel':
            result = await Certificate.find({ diesel: 'Verificado', status: 'Activo' }).sort({ timestamp: -1 });
            break;
    }

    return res.status(200).send({ certificados: result })

}

async function getCertificates(req, res) {
    let store = await Store.findOne({ name: req.body.store }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        return result
    })
    let subsidiaria = store.sbs; //Subsidaria por tienda
    let certificados_activos; //Contiene todo los certificados por aprovar de una subsidiaria
    let certificados_canjeados; //Contiene todo los certificados aprovados de una subsidiaria
console.log(subsidiaria)
    switch (subsidiaria) {
        case 'Meatpack':
            console.log(1)
            certificados_activos = await Certificate.find({ meatpack: 'Verificado', status: 'Activo' });
            certificados_canjeados = await Certificate.find({ meatpack: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        case 'Sperry':
            console.log(2)
            certificados_activos = await Certificate.find({ sperry: 'Verificado', status: 'Activo' });
            certificados_canjeados = await Certificate.find({ sperry: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        case 'Quiksilver':
            console.log(3)
            certificados_activos = await Certificate.find({ quiksilver: 'Verificado', status: 'Activo' });
            certificados_canjeados = await Certificate.find({ quiksilver: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        case 'Guess':
            certificados_activos = await Certificate.find({ guess: 'Verificado', status: 'Activo' });
            certificados_canjeados = await Certificate.find({ guess: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        case 'Arrital':
            console.log(4)
            certificados_activos = await Certificate.find({ colehaan: 'Verificado', status: 'Activo' });
            certificados_canjeados = await Certificate.find({ colehaan: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        case 'Diesel':
            console.log(5)
            certificados_activos = await Certificate.find({ diesel: 'Verificado', status: 'Activo' });
            certificados_canjeados = await Certificate.find({ diesel: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        case 'Oficina':
            console.log(6)
            certificados_activos = await Certificate.find({ diesel: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            certificados_canjeados = await Certificate.find({ diesel: 'Canjeado', status: 'Inactivo', store_change: req.body.store });
            break;
        default:
            console.log(7)
            certificados_activos = await Certificate.find({ status: 'Activo' });
            certificados_canjeados = await Certificate.find({ status: 'Inactivo' });
            break;
    }
    console.log({ activos: certificados_activos, canjeados: certificados_canjeados })
    return res.status(200).send({ activos: certificados_activos, canjeados: certificados_canjeados });
}

async function updateCertificate(req, res) {
    let daten = Moment().tz('America/Guatemala')._d;
    let dataUpdate;

    let store_sbs = await Store.findOne({ name: req.body.store });
    let subsidiaria = store_sbs.sbs;
    console.log(res.body)
    //filtro de los tickets por tienda
    switch (subsidiaria) {
        case 'Meatpack':
            dataUpdate = {
                $set: {
                    status: 'Inactivo',
                    meatpack: 'Canjeado',
                    store_change: req.body.store,
                    num_fact: req.body.data.num_fact,
                    val_fact: req.body.data.val_fact,
                    date_end: daten
                }
            };
            break;
        case 'Sperry':
            dataUpdate = {
                $set: {
                    status: 'Inactivo',
                    sperry: 'Canjeado',
                    store_change: req.body.store,
                    num_fact: req.body.data.num_fact,
                    val_fact: req.body.data.val_fact,
                    date_end: daten
                }
            };
            break;
        case 'Quiksilver':
            dataUpdate = {
                $set: {
                    status: 'Inactivo',
                    quiksilver: 'Canjeado',
                    store_change: req.body.store,
                    num_fact: req.body.data.num_fact,
                    val_fact: req.body.data.val_fact,
                    date_end: daten
                }
            };
            break;
        case 'Guess':
            dataUpdate = {
                $set: {
                    status: 'Inactivo',
                    guess: 'Canjeado',
                    store_change: req.body.store,
                    num_fact: req.body.data.num_fact,
                    val_fact: req.body.data.val_fact,
                    date_end: daten
                }
            };
            break;
        case 'Arrital':
            dataUpdate = {
                $set: {
                    status: 'Inactivo',
                    meatpack: 'arrital',
                    store_change: req.body.store,
                    num_fact: req.body.data.num_fact,
                    val_fact: req.body.data.val_fact,
                    date_end: daten
                }
            };
            break;
        case 'Diesel':
            dataUpdate = {
                $set: {
                    status: 'Inactivo',
                    diesel: 'Canjeado',
                    store_change: req.body.store,
                    num_fact: req.body.data.num_fact,
                    val_fact: req.body.data.val_fact,
                    date_end: daten
                }
            };
            break;
        default:

            break;
    }

await Certificate.updateOne({ _id: req.body.id }, dataUpdate, (err, result) => {
        if(err) return res.status(500).send({ message : 'Error, no se puedo realizar la petición' });
        if(!result) return res.status(404).send({ message : 'Error, algo salío mal!' });
        return res.status(200).send({ update: result, message: 'El certificado fue cajeado exitosamente' });
    });
}

module.exports = {
    store_certificate,
    getCertificates,
    getCertificatesActives,
    updateCertificate,
}