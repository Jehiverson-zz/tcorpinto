'use strict'

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function Login(req, res) {
    User.findOne({
        email: req.body.user
    })
    .then(user => {
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    check: true,
                    user_data: user
                };

                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })

                res.send({token, user})
            } else {
                res.status(400).json({ err: '1', message: 'Contraseña incorrecta' })
            }
        } else {
            res.status(400).json({ err: '2', message: 'Usuario Incorrecto' })
        }
    })
    .catch(err => {
        res.status(400).json({ error: err })
    })
}



async function getUsers(req, res) {
    const users = await User.find();
       res.json(users);
}


module.exports = {
    Login,
    getUsers
}