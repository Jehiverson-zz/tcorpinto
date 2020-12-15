'use strict'
const bcrypt = require('bcrypt-nodejs');
const Status = require('../models/Status');
const User = require('../models/User');
const Collaborator = require('../models/Collaborator');

const Subsidiaria = require('../models/Subsidiaria');
const Store = require('../models/Store');

async function showStatus(req, res) {
    let showStatusInfo = await Status.find();
    return res.json({ showStatusInfo });
}

async function createStatus(req, res) {
    console.log(req.body)
    const creatStatusInfo = Status({
        name: req.body.name,
        status: req.body.status,
        createdAt: new Date()
    });
    await creatStatusInfo.save();
    return res.status(200).json({ error: 0, message: "Estado Ingresado" });
}

async function updateStatus(req, res) {
    console.log(req.body)
    var myquery = { _id: req.body.id };
    const updatetaStusInfo = {
        name: req.body.name,
        status: req.body.status.label ? req.body.status.label : req.body.status,
        updatedAt: new Date(),
    };

    await Status.updateOne(myquery, updatetaStusInfo);
    return res.status(200).json({ error: 0, message: "Estado Actualizado" });
}

async function showUser(req, res) {
    let showUserInfo = await User.find();
    return res.json({ showUserInfo });
}

async function createUser(req, res) {
    console.log(req.body);
    const creatStatusInfo = User({
        email:req.body.email,
        name: req.body.name,
        password: req.body.password,
        status: req.body.status,
        type: req.body.type,
        change_date: req.body.change_date,
        store: req.body.store,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    await creatStatusInfo.save();
    return res.status(200).json({ error: 0, message: "Usuario Ingresado" });
}

async function updateUser(req, res) {
    
    var myquery = { _id: req.body.id };
    var contra;
    console.log("----------",req.body);
    if(req.body.password === req.body.passwordC){
    var contra = req.body.password;
    const updatetaStusInfo = {
        email:req.body.email,
        name: req.body.name,
        password: contra,
        status: req.body.status.label ? req.body.status.label : req.body.status,
        type: req.body.typeUser.label ? req.body.typeUser.label : req.body.typeUser,
        change_date: req.body.change_date,
        store: req.body.store.label ? req.body.store.label : req.body.store,
        updatedAt: new Date()
    };
    console.log(2);
    console.log(myquery);
    console.log(updatetaStusInfo);

    await User.updateOne(myquery, updatetaStusInfo);
        
    return res.status(200).json({ error: 0, message: "Usuario Actualizado" });
    }else{
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(req.body.password, salt, null, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ error: 1, message: "Error al actualizar usuario" });
                }
                
                
                const updatetaStusInfo = {
                    email:req.body.email,
                    name: req.body.name,
                    password: hash,
                    status: req.body.status.label ? req.body.status.label : req.body.status,
                    type: req.body.typeUser.label ? req.body.typeUser.label : req.body.typeUser,
                    change_date: req.body.change_date,
                    store: req.body.store.label ? req.body.store.label : req.body.store,
                    updatedAt: new Date()
                };
                console.log(1);
                console.log(myquery);
                console.log(updatetaStusInfo);
    
                await User.updateOne(myquery, updatetaStusInfo);
                    
                return res.status(200).json({ error: 0, message: "Usuario Actualizado" });
            });
        });
    }
}

async function showCollaborator(req, res) {
    let showCollaboratorInfo = await Collaborator.find({},{name:1,status:1,timestamp:1,store_asigned:1});
    return res.json({ showCollaboratorInfo });
}

async function createCollaborator(req, res) {

    const creatCollaboratorInfo = Collaborator({
        name: req.body.name,
        store_asigned: req.body.store,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    await creatCollaboratorInfo.save();
    return res.status(200).json({ error: 0, message:"Colaborador Ingresado", data:creatCollaboratorInfo });
}

async function updateCollaborator(req, res) {
    await Collaborator.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        store_asigned: req.body.store,
        status: req.body.status,
        updatedAt: new Date(),
      },(error,response) => {
        if(error) return res.status(500).json({ error: 1, message:"Error en el servidor", textError: error });
        return res.status(200).json({ error: 0, message:"Colaborador Actualizado", data: response });
      });
}

async function showUser(req, res) {
    let showUserInfo = await User.find();
    return res.json({ showUserInfo });
}

async function showSubsidiaria(req, res) {
    let showSubsidiariaInfo = await Subsidiaria.find();
    return res.json({ subsidiarias: showSubsidiariaInfo });
}

async function getSubsidiariaActives(req, res) {
  await Subsidiaria.find({ status: 'Activo' }, (err, subsidiarias)=>{
    if(err) { console.log(err); return }
    return res.json({ subsidiarias });
  });
}

async function createSubsidiaria(req, res) {

    const creatSubsidiaria = Subsidiaria({
        name: req.body.name,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    await creatSubsidiaria.save();
    return res.status(200).json({ error: 0, message:"Subsidiaria Creada" });
}

async function updateSubsidiaria(req, res) {
    await Subsidiaria.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        status: req.body.status,
        updatedAt: new Date(),
      },(error,response) => {
        if(error) return res.status(500).json({ error: 1, message:"Error en el servidor", textError: error });
        return res.status(200).json({ error: 0, message:"Subsidiaria Actualizada", data: response });
      });
}

async function createStore(req, res) {

    const creatStoreInfo = Store({
        name: req.body.name,
        sbs: req.body.sbs,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    await creatStoreInfo.save();
    return res.status(200).json({ error: 0, message:"Tienda Ingresado" });
}

async function updateStore(req, res) {
    await Store.findByIdAndUpdate(req.body.id,{
        name: req.body.name,
        sbs: req.body.sbs,
        status: req.body.status,
        updatedAt: new Date(),
      },(error,response) => {
        if(error) return res.status(500).json({ error: 1, message:"Error en el servidor", textError: error });
        return res.status(200).json({ error: 0, message:"Tienda Actualizada", data: response });
      });
}

module.exports = {
    showStatus,
    createStatus,
    updateStatus,
    showUser,
    createUser,
    updateUser,
    showCollaborator,
    createCollaborator,
    updateCollaborator,
    showSubsidiaria,
    getSubsidiariaActives,
    createSubsidiaria,
    updateSubsidiaria,
    createStore,
    updateStore
}
