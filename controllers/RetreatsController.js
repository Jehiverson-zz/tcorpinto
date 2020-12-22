'use strict'
const nodemailer = require('nodemailer');
const cloudinary = require('../cloudinary.config');
const Retreat = require('../models/Retreat');
const Store = require('../models/Store');
const RetreatDebt = require('../models/Retreat_debt');
const RetreatsBinacle = require('../models/Binnacle_retreats');
const { now } = require('moment-timezone');

//Generar Email
async function email(data, reseptor, emisor,titulo, template) {
    let Moment = require("moment-timezone");
    let hoy = Moment().tz("America/Guatemala")._d;
    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1;
    let yyyy = hoy.getFullYear();
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.dreamhost.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "mensajeria@tickets.corpinto.com", // generated ethereal user
            pass: "m1$0n@lc0rp!nt0" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'mensajeria@tickets.corpinto.com', // sender address
        to: reseptor, // list of receivers
        cc: emisor,
        bcc: 'Dlara2017229@gmail.com',
        subject:
            `Retiros de mercaderia - ${dd}/${mm}/${yyyy}`,
        text: "", // plain text body
        html: template, // html body
    }, async function (err, json) {
        if(err) console.log(`ERROR EN EL ENVÍO: ${err}`);
        if(json) console.log(`CORREO SE ENVIADO EXITOSAMENTE: ${json}`);
    });
}

async function showRetreats(req, res) {
    var showRetreatsInfo;
    let store = await Store.findOne({ name: req.body.store }, (err, result) => {
        if (err) { console.log(err); return; }
        return result
    })
    
    if(req.body.type === "admin"){
    
        if(req.body.email == 'luis@corpinto.com'){
            showRetreatsInfo = await Retreat.find({
              $or:[{sbs:'Alias'},{sbs:'General'}],
              status: "Pendiente"
            });
          }else if(req.body.email == 'ana@corpinto.com'){
            showRetreatsInfo = await Retreat.find({
              $or:[{sbs:'Arrital'},{sbs:'Arroba'}],
              status: "Pendiente"
            });
          }else{
            showRetreatsInfo = await Retreat.find({
              store: req.body.store,
              status: "Pendiente"
            });
          }

    }else{
        showRetreatsInfo = await Retreat.find({
            store: req.body.store,
            status: "Pendiente"
        });
    } 


    return res.json({ showRetreatsInfo });
}

async function showRetreatsDebtList(req, res) {
    let showRetreatsInfo = await RetreatDebt.find({ total_debt: { $gt: 0 } });
    return res.json({ showRetreatsInfo });
}

async function showRetreatsDebtListHistory(req, res) {
    var showRetreatsInfoAccepted;
    var showRetreatsInfoDeneged;
    var showRetreatsInfoCancel;
    if(req.body.type === "admin"){
        showRetreatsInfoAccepted = await Retreat.find({status:"Aprobado"});

        showRetreatsInfoDeneged = await Retreat.find({status:"Denegado"});
    
        showRetreatsInfoCancel = await Retreat.find({status:"Cancelado"});
    }else{
        showRetreatsInfoAccepted = await Retreat.find({status:"Aprobado", store: req.body.store});
        showRetreatsInfoDeneged = await Retreat.find({status:"Denegado", store: req.body.store});
        showRetreatsInfoCancel = await Retreat.find({status:"Cancelado", store: req.body.store});
    }

    return res.json({ "acepted": showRetreatsInfoAccepted, "deneged": showRetreatsInfoDeneged, "cancel": showRetreatsInfoCancel });
}

async function showRetreatsBinacleList(req, res) {
    console.log(req.body)
    let showRetreatsInfo = await RetreatsBinacle.find({
        name: req.body.collaborator
    });

    let showRetreatsInfoHistory = await RetreatDebt.find({
        name: req.body.collaborator
    });

    console.log(showRetreatsInfo, showRetreatsInfo);
    return res.json({ "binnacle":showRetreatsInfo, "history": showRetreatsInfoHistory });
}


async function updateRetreats(req, res) {
    const {id , action} = req.body;

    let showRetreatsInfo = await Retreat.find({
       _id: id
    });

    if(action == 'Aprobado'){

        const newRetreatsBinacle = RetreatsBinacle({
            name: showRetreatsInfo[0].name,
            debt:  "+" + showRetreatsInfo[0].price_f,
            type: showRetreatsInfo[0].description,
            date_created: Date.now()
        });
        
        var insertBinnacle = await newRetreatsBinacle.save();

        let showDebt = await RetreatDebt.find({
            name: showRetreatsInfo[0].name
         });
 
        var total = (showDebt.length !== 0 ? parseFloat(showDebt[0].total_debt) : 0 )+ showRetreatsInfo[0].price_f;

        var updateRetreatsDebt = "";
        if(showDebt.length !== 0){
            updateRetreatsDebt = await RetreatDebt.update({name: showRetreatsInfo[0].name}, {total_debt: total ,update_created: Date.now()});
            //updateRetreatsDebt = await RetreatDebt.updateOne({_id: 'ObjectId("5fc085355246872868245e7d")' }, {total_debt: total ,update_created: Date.now()});
        } else {
        const newRetreatsDebt = RetreatDebt({
            name: showRetreatsInfo[0].name,
            total_debt: total,
            date_created: Date.now(),
            update_created: Date.now(),
            status: "Activo"
            });
            
            updateRetreatsDebt = await newRetreatsDebt.save();
        }
    }

    let updateRetreatsInfo = await Retreat.updateOne({_id: id }, {status: action})

    return res.json({ updateRetreatsInfo });
}

async function updateRetreatsRemove(req, res) {

    const {vendedor, deuda, descuento} = req.body.datos;
    
    //bitacora
    const updateRetreatsBinacleData = RetreatsBinacle({
        name: vendedor,
        debt:  "-" + descuento.toString(),
        type: 'Descuento',
        date_created: Date.now()
    });
    const resultUpdateRetreats = updateRetreatsBinacleData.save();
    const updateRetreatsDebt = await RetreatDebt.updateOne({name: vendedor }, {total_debt: deuda ,update_created: Date.now()});
    console.log({update: updateRetreatsDebt, created: resultUpdateRetreats});
    return res.json({message:"Descuento Realizado", type:"success", tittle: "Completado"});
}

async function createdRetreats(req, res) {
    let file = req.file;
    let result = await cloudinary.uploader.upload(file.path);
    let data = JSON.parse(req.body.data);
    let infoStore = await Store.find({
        name: data.store
    });

    var email_re;
    if(infoStore[0].sbs == 'Alias'){
        email_re = 'luis@gmail.com';
      }else if(infoStore[0].sbs == 'Arrital'){
        email_re = 'ana@gmail.com';
      }else{
        email_re = 'luis@corpinto.com';
      }

    const newRetreats = Retreat({
        name: data.vendor,
        price: data.precio,
        descount: data.descuento,
        price_f: data.precioFinal,
        upc: data.upc,
        alu: data.alu,
        size: data.size,
        description: data.descripcion,
        filename: result.url,
        store: data.store,
        sbs: infoStore.sbs
      });

      email(
        infoStore,
        email_re,
        'jrodriguez@corpinto.com',
        'Nuevo retiro de mercaderia',
        `<!-- pre-header -->
        <table style="display:none!important;">
            <tr>
                <td>
                    <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                        Información De Envío Inmediato
                    </div>
                </td>
            </tr>
        </table>
        <!-- pre-header end -->
        <!-- header -->
        <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
            <tr>
                <td align="center">
                    <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
                        <tr>
                            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <!-- end header -->
        <!-- big image section -->
        <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
            <tr>
                <td align="center">
                    <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
                        <tr>
                            <td align="center" class="section-img">
                                 <center>
                                    <img src="${result.url}" witdh="250" height="250">
                                </center>
                            </td>
                        </tr>
                        <tr>
                            <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
                                <div style="line-height: 35px">
                                    NUEVO TICKET DE RETIRO DE MERCADERIA
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
                                    <tr>
                                        <td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="container590">
                                    <tr>
                                        <td align="center" style="font-size: 15px; font-family: "Work Sans", Calibri, sans-serif; line-height: 24px; color:black">
                                            <div style="color:black">
                                                <b> Se solicito un retiro de mercadería por la tienda ${infoStore[0].sbs} </b> por el colaborador ${data.vendor}
                                            </b>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="hide">
                <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
            </tr>
            <tr>
                <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
            </tr>
        </table>
        <!-- end section -->`
    )

    

    const saveRe = await newRetreats.save();

    return res.json({ data: newRetreats });
}

module.exports = {
    showRetreats,
    showRetreatsDebtList,
    showRetreatsDebtListHistory,
    showRetreatsBinacleList,
    createdRetreats,
    updateRetreats,
    updateRetreatsRemove
}
