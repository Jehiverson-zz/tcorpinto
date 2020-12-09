'use strict'

const Status = require('../models/Status');
const User = require('../models/User');
const Collaborator = require('../models/Collaborator');

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
    console.log(req.body)
    const creatStatusInfo = User({
        name: req.body.name,
        status: req.body.status,
        createdAt: new Date()
    });
    await creatStatusInfo.save();
    return res.status(200).json({ error: 0, message: "Estado Ingresado" });
}

async function updateUser(req, res) {
    var myquery = { _id: req.body.id };
    const updatetaStusInfo = {
        name: req.body.name,
        status: req.body.status.label ? req.body.status.label : req.body.status,
        updatedAt: new Date(),
    };

    await User.updateOne(myquery, updatetaStusInfo);
    return res.status(200).json({ error: 0, message: "Estado Actualizado" });
}


module.exports = {
    showStatus,
    createStatus,
    updateStatus,

    showUser,
    createUser,
    updateUser,
}