'use strict'

const Collaborator = require('../models/Collaborator');

//Obtiene los colaboradores
async function getCollaborator(req, res) {
    let collaborator = await Collaborator.find({
        status:"Activo"
    },{name: 1});
    return res.json({collaborator});
}

module.exports = {
    getCollaborator
}