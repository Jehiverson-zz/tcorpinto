'use strict'

const Status = require('../models/Status');
const User = require('../models/User');
const Collaborator = require('../models/Collaborator');

async function showStatus(req, res) {
    let showStatusInfo = await Status.find();
    return res.json({ showStatusInfo });
}

async function createStatus(req, res) {

    const creatStatusInfo = Status({
        name: req.body.name,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    await creatStatusInfo.save();
    return res.status(200).json({ error: 0, message:"Estado Ingresado" });
}

async function updateStatus(req, res) {
    var myquery = { _id: req.body.id };
    const updatetaStusInfo = {
        name: req.body.name,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    await Status.updateOne(myquery, updateStatus);
    return res.status(200).json({ error: 0, message:"Estado Actualizado" });
}

async function showUser(req, res) {
    let showUserInfo = await User.find();
    return res.json({ showUserInfo });
}

async function showCollaborator(req, res) {
    let showCollaboratorInfo = await Collaborator.find({},{name:1,status:1,timestamp:1,store_asigned:1});
    return res.json({ showCollaboratorInfo });
}


module.exports = {
    showStatus,
    createStatus,

    showUser,

    showCollaborator
}