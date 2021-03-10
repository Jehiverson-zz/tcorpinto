'use strict'

const Collaborator = require('../models/Collaborator');

//Obtiene los colaboradores
async function getCollaborator(req, res) { 
    let collaborator = await Collaborator.find({
        status:"Activo"
    });
    return res.json({collaborator});
}

module.exports = {
    getCollaborator
}