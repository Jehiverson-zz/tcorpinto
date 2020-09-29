const express = require('express');
const router = express.Router();

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth2");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Models
const User = require('../models/User');
//Controllers
const userController = require('../controllers/UserController');
const ticketController = require('../controllers/TicketController');
const collaboratorController = require('../controllers/CollaboratorController');
const binnacleSaleController = require('../controllers/BinnacleSaleController');
const DamagedMerchandiseController = require('../controllers/DamagedMerchandiseController');

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

router.get('/',userController.getUsers);

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
                    res.send({token, user})
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
router.post('/binnacles/sales_show', binnacleSaleController.getBinnacleSale)
router.get('/binnacles/sales/:id', binnacleSaleController.getBinnacleSaleReportBefore)
router.get('/binnacles/sales_totals', binnacleSaleController.getBinnacleSaleReportTotal)
//ReporteLourdes
router.post('/binnacles_dailies/show', binnacleSaleController.getBinnacleDailies)

/*-------------------------------------------
----------------- TICKETS -------------------
---------------------------------------------*/
router.post('/tickets/add/transfer', ticketController.storeTicketSystemTransfer);
router.post('/tickets/add/inmediates', ticketController.storeTicketInmediates);
router.post('/tickets/add/photo_retreats', ticketController.storeTicketPhotoRetreats);
router.post('/tickets/add/external_retreats', ticketController.storeTicketExternalRetreats);
router.post('/tickets/transfer', ticketController.getAllTicketsSystemTransfer);
router.post('/tickets/transfer_created', ticketController.getSystemTransferCreate);
router.post('/tickets/transfer_assigned', ticketController.getSystemTransferAssigned);
router.post('/tickets/immediate_deliveries', ticketController.getAllTicketsInmediates);
router.post('/tickets/immediate_deliveries_assigned', ticketController.getTicketsInmediatesAssigned);
router.post('/tickets/immediate_deliveries_created', ticketController.getTicketsInmediatesCreated);
router.post('/tickets/all/photo_retreats', ticketController.getAllPhotoRetreats);
router.post('/tickets/photo_retreats', ticketController.getPhotoRetreats);
router.post('/tickets/all/external_retreats', ticketController.getAllExernalRetreats);
router.post('/tickets/external_retreats', ticketController.getExernalRetreats);
router.put('/ticket/inactive/:id', ticketController.inactivateTicket);
router.put('/ticket/immediate_deliveries/inactive/:id', ticketController.inactivateTicketInmediate);
router.put('/ticket/photo_retreats/inactive/:id', ticketController.inactivatePhotoRetreats);
router.put('/ticket/external_retreats/inactive/:id', ticketController.inactivateExternalRetreats);
router.put('/ticket/complete/:id', ticketController.completeTicket);
router.put('/ticket/immediate_deliveries/complete/:id', ticketController.completeTicketInmediate);
router.put('/ticket/photo_retreats/complete/:id', ticketController.completePhotoRetreats);
router.get('/tickets/stores', ticketController.getStore);


/*-------------------------------------------
----------------- COLLABORATOR --------------
---------------------------------------------*/

router.get('/collaborator/get',collaboratorController.getCollaborator);


/*-------------------------------------------
-----------------Datos De Ventas-------------
---------------------------------------------*/

router.post('/sales/create',binnacleSaleController.setBinnacleSalesCreate);
router.post('/sales/delete',binnacleSaleController.deleteDataSale);
router.post('/sales/validationDataSale',binnacleSaleController.validationDataSale);


/*-----------------------------------------------------
----------------- MERCADERIA DAÑADA -------------------
-------------------------------------------------------*/
router.post('/damaged_merchandise/create', DamagedMerchandiseController.storeDamagedMerchandise);
router.post('/damaged_merchandise', DamagedMerchandiseController.getDamageMerchandise);
router.post('/binnacles_dailies/delete',binnacleSaleController.deleteBinnacleDailies);


module.exports = router;