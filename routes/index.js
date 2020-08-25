const express = require('express');
const { Router } = require('express');
const router = Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Models
const User = require('../models/User');
//Controllers
const userController = require('../controllers/UserController');
const ticketController = require('../controllers/TicketController');
const collaboratorController = require('../controllers/CollaboratorController');
const binnacleSaleController = require('../controllers/BinnacleSaleController');

const routesProtected = express.Router();

routesProtected.use((req, res, next) =>{

    const token = req.headers.token;
    if(token){
        console.log(token)
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            console.log("1")
            if(err){
                console.log("2")
                res.json({message:'Token Inválida.'});
            }else{
                console.log("3")
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(400).json({message:'No se envio Token.'});
        console.log("Murio")
    }
});

router.get('/',routesProtected,userController.getUsers);

router.post('/login',userController.Login);


router.post('/login/google', async(req, res) =>{
    User.findOne({
        email: req.body.user
      })
        .then(user => {
            if(user){
                    const payload = {
                        check:  true,
                        user_data: user
                       };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                      })
                    res.send(token)
            }else{
                res.status(400).json({err:'2', message:'Usuario Incorrecto'})
            }
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
})

/*-------------------------------------------
----------------- TOCKETS -------------------
---------------------------------------------*/
router.get('/binnacles/sales_show_report', binnacleSaleController.getBinnacleSaleReport)
router.get('/binnacles/sales_show',routesProtected, binnacleSaleController.getBinnacleSale)


/*-------------------------------------------
----------------- TOCKETS -------------------
---------------------------------------------*/
router.post('/tickets/add/transfer', ticketController.storeTicketSystemTransfer)
router.get('/tickets/transfer', ticketController.getSystemTransfer)
router.get('/tickets/stores', ticketController.getStore)


/*-------------------------------------------
----------------- COLLABORATOR --------------
---------------------------------------------*/

router.get('/collaborator/get',collaboratorController.getCollaborator)

module.exports = router;