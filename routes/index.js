const express = require('express');
const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');
const User = require('../models/User');


const routesProtected = express.Router();

routesProtected.use((req, res, next) =>{
    const token = req.headers.token;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            if(err){
                res.json({message:'Token Inválida.'});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(400).json({message:'No se envio Token.'});
    }
});

router.get('/', userController.getUsers);

router.post('/login', userController.Login);

module.exports = router;