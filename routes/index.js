const express = require('express');
const { Router } = require('express');
const router = Router();

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');
const ticketController = require('../controllers/TicketController');
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
router.post('/tickets/add/transfer', ticketController.storeTicketSystemTransfer);
router.post('/tickets/add/inmediates', ticketController.storeTicketInmediates);
router.post('/tickets/add/photo_retreats', ticketController.storeTicketPhotoRetreats);
router.post('/tickets/add/external_retreats', ticketController.storeTicketExternalRetreats);
router.post('/tickets/transfer_created', ticketController.getSystemTransferCreate);
router.post('/tickets/transfer_assigned', ticketController.getSystemTransferAssigned);
router.post('/tickets/photo_retreats', ticketController.getPhotoRetreats);
router.post('/tickets/external_retreats', ticketController.getExernalRetreats);
router.put('/ticket/inactive/:id', ticketController.inactivateTicket);
router.put('/ticket/photo_retreats/inactive/:id', ticketController.inactivatePhotoRetreats);
router.put('/ticket/external_retreats/inactive/:id', ticketController.inactivateExternalRetreats);
router.put('/ticket/complete/:id', ticketController.completeTicket);
router.put('/ticket/photo_retreats/complete/:id', ticketController.completePhotoRetreats);
router.get('/tickets/stores', ticketController.getStore);

module.exports = router;