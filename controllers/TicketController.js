'use strict'

const Store = require('../models/Store');
const TicketSystem = require("../models/TicketSystem");
const TicketInmediates = require("../models/TicketInmediates");
const TicketPhoto = require("../models/TicketPhoto");
const TicketExternal = require('../models/TicketExternal');
const nodemailer = require("nodemailer");
const cloudinary = require('../cloudinary.config');

//Crea los tickets de traslado de sistema
async function storeTicketSystemTransfer(req, res) {
    let params = req.body;
    let Ticket = new TicketSystem();
    console.log(params)
    //Se genera en el ticket de la tranferencia
    Ticket.status = 'Pendiente';
    Ticket.store_created = params[0].store_created;
    Ticket.store_asigned = params[0].store_asigned;

    //insertamos los productos que se transferiran con el ticket
    params.map(data => {
        let producto = {
            upc: data.upc,
            alu: data.alu,
            size: data.size,
            bill: data.bill,
        }
        Ticket.product.push(producto);
    })

    await Ticket.save(async (err, storedTicket) => {
        if (err) return res.status(500).send({ message: 'Error al crear el ticket' });
        if (storedTicket) {
            let result_email = await email(
                params,
                'Nuevo Ticket De Traslado Sistema Informática',
                `<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
                    <tr>
                        <td align="center">
                            <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
                                <tr>
                                    <td align="center" class="section-img">
                                        <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://static.vecteezy.com/system/resources/previews/000/511/940/large_2x/currency-exchange-glyph-black-icon-vector.jpg" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
                                        <div style="line-height: 35px">
                                            NUEVO TICKET TRASLADO EN SISTEMA
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
                                                        Se ha creado un ticket de traslado de mercaderia unicamente en el sistema de la tienda <b>${params[0].store_created}</b>, 
                                                        por favor dar seguimiento al ticket dentro de la plataforma.
                                                    </div>
                                                    <p>listado de articulos solicitados:</p>
                                                    <table class="table" style="text-align: center" width="90%">
                                                        <thead align="center">
                                                            <tr>
                                                                <th scope="col" width: 20px>UPC</th>
                                                                <th scope="col" width: 20px>ALU</th>
                                                                <th scope="col" width: 20px>TALLA</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody align="center">
                                                        ${
                                                            params.map(x => {
                                                                return (
                                                                    `<tr>
                                                                        <td>${x.upc}</td>
                                                                        <td>${x.alu}</td>
                                                                        <td>${x.size}</td>
                                                                    </tr>`
                                                                )
                                                            })
                                                        }
                                                        </tbody>
                                                    </table>
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
                </table>`
            );
            console.log(result_email)
            return res.status(200).send({ ticket: storedTicket, message: 'Ticket creado exitosamente!' });
        }
    });
}
//Crea los tickets de entragas inmediatas
async function storeTicketInmediates(req, res) {
    let params = req;
    let Inmediates = new TicketInmediates();
    //let result = await cloudinary.uploader.upload(req.files.image.path);
    console.log(params)
    //Se genera en el ticket de la tranferencia
    // Inmediates.status = 'Pendiente';
    // Inmediates.store_created = params[0].store_created;
    // Inmediates.store_asigned = params[0].store_asigned;
    // Inmediates.desc = params[0].descripcion;
    // Inmediates.fact = params[0].bill;
    // //Inmediates.image = result.public_id;

    // params.map(data => {
    //     let producto = {
    //         upc: data.upc,
    //         alu: data.alu,
    //         size: data.size,
    //     }
    //     Inmediates.product.push(producto);
    // })

    // await Inmediates.save(async (err, stored) => {
    //     if (err) return res.status(500).send({ message: 'Error al crear el ticket' });
    //     if (stored) {
    //         /*await email(
    //             params,
    //             `<table style="display:none!important;">
    //             <tr>
    //                 <td>
    //                     <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
    //                         Información De Envio Inmediato
    //                     </div>
    //                 </td>
    //             </tr>
    //         </table>
    //         <!-- pre-header end -->
    //         <!-- header -->
    //         <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
        
    //             <tr>
    //                 <td align="center">
    //                     <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
        
    //                         <tr>
    //                             <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
    //                         </tr>
        
                
        
    //                         <tr>
    //                             <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
    //                         </tr>
        
    //                     </table>
    //                 </td>
    //             </tr>
    //         </table>
    //         <!-- end header -->
        
    //         <!-- big image section -->
    //         <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
        
    //             <tr>
    //                 <td align="center">
    //                     <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
    //                         <tr>
        
    //                             <td align="center" class="section-img">
    //                                 <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="http://bienestarspm.uach.cl/wp-content/uploads/2018/08/306470.png" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
    //                             </td>
    //                         </tr>
    //                         <tr>
    //                             <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
    //                         </tr>
    //                         <tr>
    //                             <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
        
        
    //                                 <div style="line-height: 35px">
        
    //                                     NUEVO TICKET
        
    //                                 </div>
    //                             </td>
    //                         </tr>
        
    //                         <tr>
    //                             <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
    //                         </tr>
        
    //                         <tr>
    //                             <td align="center">
    //                                 <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
    //                                     <tr>
    //                                         <td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
    //                                     </tr>
    //                                 </table>
    //                             </td>
    //                         </tr>
        
    //                         <tr>
    //                             <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
    //                         </tr>
        
    //                         <tr>
    //                             <td align="center">
    //                                 <table border="0" width="600" align="center" cellpadding="0" cellspacing="0" class="container590">
    //                                     <tr>
    //                                         <td align="center" style="font-size: 15px; font-family: "Work Sans", Calibri, sans-serif; line-height: 24px; color:black">
        
        
    //                                             <div style="color:black">
    //                                             <b> Se solicito un envió inmediato de mercadería por la tienda <b>${params[0].store_created}</b>. El traslado saldrá de la tienda <b>${params[0].store_asigned}</b> y será a <b>${params[0].desc}</b>

    //                                             </b>
    //                                             <br>
    //                                             </b>
    //                                             <p>listado de articulos solicitados:</p>
    //                                          <table class="table">
    //                                             <thead>
    //                                                 <tr>
    //                                                 <th scope="col">UPC</th>
    //                                                 <th scope="col">ALU</th>
    //                                                 <th scope="col">TALLA</th>
    //                                                 </tr>
    //                                             </thead>
    //                                             <tbody>
    //                                             ${
    //             params.map(x => {
    //                 return (
    //                     `<tr>
    //                                                             <td>${x.upc}</td>
    //                                                             <td>${x.alu}</td>
    //                                                             <td>${x.size}</td>
    //                                                         </tr>`
    //                 )
    //             })
    //             }
    //                                             </tbody>
    //                                         </table>
    //                                             </div>
    //                                         </td>
    //                                     </tr>
    //                                 </table>
    //                             </td>
    //                         </tr>
        
                           
        
        
    //                     </table>
        
    //                 </td>
    //             </tr>
        
    //             <tr class="hide">
    //                 <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
    //             </tr>
    //             <tr>
    //                 <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
    //             </tr>
        
    //         </table>`
    //         )*/
    //         //return res.status(200).send({ ticket: stored, message: 'Ticket generado exitosamente!' })
    //     }
    //});

}
//Crea los tickets de retiros de fotografias
async function storeTicketPhotoRetreats(req, res) {
    let params = req.body;
    let Ticket = new TicketPhoto();

    //Se genera en el ticket de la tranferencia
    Ticket.status = 'Pendiente';
    Ticket.store_created = params[0].store_created;
    Ticket.store_asigned = "Pruebas Sistemas";
    Ticket.caurier = params[0].caurier;

    //insertamos los productos que se transferiran con el ticket
    params.map(data => {
        let producto = {
            upc: data.upc,
            alu: data.alu,
            size: data.size,
        }
        Ticket.product.push(producto);
    })
    //Se guarda el ticket
    await Ticket.save((err, storedTicket) => {
        if (err) return res.status(500).send({ message: 'Error al crear el ticket' });
        if (storedTicket) {
            email(
                params,
                'Retiro de Mercaderia para fotografía',
                `<table style="display:none!important;">
                <tr>
                    <td>
                        <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                            Información De Envio Inmediato
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
                                    <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://cdn.pixabay.com/photo/2016/10/08/18/34/camera-1724286_960_720.png" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
                                </td>
                            </tr>
                            <tr>
                                <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
                                    <div style="line-height: 35px">
                                        NUEVO TICKET RETIRO FOTOGRAFÍA
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
                                                <b>Se entrego a André Cifuentes la siguente mercadería para toma de fotos, lo esta retirando ${params[0].caurier}
                                                </b>
                                                <br>
                                                </b>
                                                <p>listado de articulos solicitados:</p>
                                             <table class="table">
                                             <thead align="center">
                                             <tr>
                                                 <th scope="col" width: 20px>UPC</th>
                                                 <th scope="col" width: 20px>ALU</th>
                                                 <th scope="col" width: 20px>TALLA</th>
                                             </tr>
                                         </thead>
                                         <tbody align="center">
                                            ${
                                            params.map(x => {
                                                return (
                                                    `<tr>
                                                         <td>${x.upc}</td>
                                                         <td>${x.alu}</td>
                                                         <td>${x.size}</td>
                                                     </tr>`
                                                    )
                                                })
                                            }
                                         </tbody>
                                        </table>
                                                </div>
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
            return res.status(200).send({ ticket: storedTicket, message: 'Ticket creado exitosamente!' });
        }
    });
}
//Crea los tickets de retiros externos
async function storeTicketExternalRetreats(req, res) {
    let params = req.body;
    let Ticket = new TicketExternal();

    //Se genera en el ticket de la tranferencia
    Ticket.store_created = params[0].store_created;
    Ticket.name = params[0].person_retreats,
        Ticket.manager = params[0].person_authorizing,
        Ticket.inv_val = params[0].bill,
        Ticket.status = "Completado"
    //insertamos los productos que se transferiran con el ticket
    params.map(data => {
        let producto = {
            upc: data.upc,
            alu: data.alu,
            size: data.size,
        }
        Ticket.product.push(producto);
    })

    //Se guarda el ticket
    await Ticket.save((err, storedTicket) => {
        if (err) return res.status(500).send({ message: 'Error al crear el ticket' });
        if(storedTicket){
            email(
                params,
                'Nuevo Ticket De Retitos Externos',
                `<!-- pre-header -->
                <table style="display:none!important;">
                    <tr>
                        <td>
                            <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                                Información de Ticket de la plataforma
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
                                        <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/701/original/receipt.png?1513421069" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
            
            
                                        <div style="line-height: 35px">
            
                                            <span style="color: #5caad2;"></span>Solicitud de retiro de mercadería</span>
            
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
                                    <td align="center" style="color:black">
                                        <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">
                                            <tr>
                                                <td align="center" style="font-size: 15px; font-family: "Work Sans", Calibri, sans-serif; line-height: 24px;">
            
            
                                                    <div style="line-height: 24px">
                                                     ${params[0].person_retreats} acaba de solicitar un retiro de mercadería en la tienda ${params[0].store_created}, por favor dar seguimiento dentro de la plataforma. 
                                                    </div>
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
            return res.status(200).send({ ticket: storedTicket, message: 'Ticket creado exitosamente!' });
        }
    });
}
//Obtiene los tikets creados por el usuario que se trasladan a otra tienda
async function getSystemTransferCreate(req, res) {
    let ticketSystem = await TicketSystem.find({
        status: 'Pendiente',
        $or: [
            { store_created: req.body.store },
        ]
    }).sort({ timestamp: -1 });

    return res.status(200).json({
        ticketSystem
    });
}
//Obtiene los tikets asignados a la tienda del usuario
async function getSystemTransferAssigned(req, res) {
    let ticketSystem = await TicketSystem.find({
        status: 'Pendiente',
        $or: [
            { store_asigned: req.body.store }
        ]
    }).sort({ timestamp: -1 });

    return res.status(200).json({
        ticketSystem
    });
}
//Obtiene los tikets de retiros de fotografía
async function getPhotoRetreats(req, res) {
    let ticketPhotoRetrats = await TicketPhoto.find({
        status: 'Pendiente',
        $or: [
            { store_created: req.body.store },
        ]
    }).sort({ timestamp: -1 });

    return res.status(200).json({
        ticketPhotoRetrats
    });
}
//Obtiene los tikets de retiros externos
async function getExernalRetreats(req, res) {
    await TicketExternal.find({
        store_created: req.body.store,
        status: "Completado"
    }).exec((error, result) => {
        if (error) return res.status(500).send({ message: "Error en la busqueda" })
        return res.status(200).send({ result })
    });
}
//Inactiva los tikets de traslados de sistema
async function inactivateTicket(req, res) {
    let ticket_id = req.params.id;

    TicketSystem.findByIdAndUpdate(ticket_id, { status: 'Inactvio' }, async (err, inactive) => {
        if (err) return res.status(500).send({ message: "Error al eliminar ticket" });
        if (inactive) {
            console.log(inactive.store_created);
            let params = [inactive]
            await email(
                params,
                'Ticket Traslado De Sistema Cancelado',
                `<table style="display:none!important;">
                <tr>
                    <td>
                        <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                            Información de Ticket de la plataforma
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
                                    <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/close-circle-red-512.png" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
                                </td>
                            </tr>
                            <tr>
                                <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
        
        
                                    <div style="line-height: 35px">
        
                                        TICKET TRASLADO DE SISTEMA CANCELADO
        
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
                                                La tienda <b>${inactive.store_asigned}</b> ha cancelado el ticket de petición de traslado en sistema 
                                                </div>
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
            return res.status(200).send({ message: 'Ticket eliminado!', ticekt: inactive })
        }
    })
}
//Inactiva los tikets de fotos retiradas
async function inactivatePhotoRetreats(req, res) {
    let ticket_id = req.params.id;

    TicketPhoto.findByIdAndUpdate(ticket_id, { status: 'Inactvio' }, (err, inactive) => {
        if (err) return res.status(500).send({ message: "Error al eliminar ticket" });
        if(inactive){
            email(
                [inactive],
                'Cancelar Retiro Fotografía',
                `<!-- pre-header -->
                <table style="display:none!important;">
                    <tr>
                        <td>
                            <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                                Información de Ticket de la plataforma
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
                                        <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/close-circle-red-512.png" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
            
            
                                        <div style="line-height: 35px">
            
                                            TICKET PARA FOTOS CANCELADO
            
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
                                                    La tienda {{store}} ha cancelado el ticket de petición de Retiro de mercadería para fotos
                                                    </div>
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
            return res.status(200).send({ message: 'Ticket eliminado!', ticekt: inactive })
        }
    })
}
//Inactiva los tikets de retiros externos
async function inactivateExternalRetreats(req, res) {
    let ticket_id = req.params.id;

    TicketExternal.findByIdAndUpdate(ticket_id, { status: 'Inactvio' }, (err, inactive) => {
        if (err) return res.status(500).send({ message: "Error al eliminar ticket" });
        if(inactive){
            return res.status(200).send({ message: 'Ticket eliminado!', ticekt: inactive })
        }
    })
}
//Pasar estado de ticket de pendiente a completado
async function completeTicket(req, res) {
    let ticket_id = req.params.id;

    TicketSystem.findByIdAndUpdate(ticket_id, { status: 'Completado' }, async (err, complete) => {
        if (err) return res.status(500).send({ message: "Error al completar ticket" });
        if (complete) {
            let params = [complete]
            await email(
                 params,
                'Ticket De Traslado sistema Completado',
                `<!-- pre-header -->
                <table style="display:none!important;">
                    <tr>
                        <td>
                            <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                                Información de Ticket de la plataforma
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
                                        <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="https://static.vecteezy.com/system/resources/previews/000/511/940/large_2x/currency-exchange-glyph-black-icon-vector.jpg" style="display: block; width: 190px;" width="190" border="0" alt="" /></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
                                        <div style="line-height: 35px">
                                            TICKET TRASLADO DE SISTEMA COMPLETADO
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
                                                        El traslado que solicitaste a la tienda <b>${complete.store_asigned}</b> por el sistema ya fue realizado verificarlo por favor.
                                                    </div>
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
            return res.status(200).send({ message: 'El ticket se a completado!', ticekt: complete })
        }
    })
}
//Pasar estado de ticket de pendiente a completado
function completePhotoRetreats(req, res) {
    let ticket_id = req.params.id;

    TicketPhoto.findByIdAndUpdate(ticket_id, { status: 'Completado' }, (err, complete) => {
        if (err) return res.status(500).send({ message: "Error al completar ticket" });
        return res.status(200).send({ message: 'El ticket se a completado!', ticekt: complete })
    })
}
//Obetener todas las tiendas
async function getStore(req, res) {
    let result = await Store.find();
    return res.json({ result })
}
//Crea un codigo random para los tickets
function randomNumber() {
    const possible = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let ramdomNum = 0;
    for (let i = 0; i < 6; i++) {
        ramdomNum += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return ramdomNum;
}
//Generar Email
async function email(data, titulo, template) {
    let randsend = randomNumber();
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
            user: "soporte@tickets.corpinto.com", // generated ethereal user
            pass: "m1$0n@lc0rp!nt0" // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'soporte@tickets.corpinto.com', // sender address
        to: "dlara2017229@gmail.com", // list of receivers
        subject:
            `${titulo} ${data[0].store_created} ${dd}/${mm}/${yyyy} - Ticket ${randsend}`,
        text: "", // plain text body
        html: template, // html body
    }, async function (err, json) {
        if(err) console.log(`ERROR EN EL ENVÍO: ${err}`);
        if(json) console.log(`CORREO SE ENVIADO EXITOSAMENTE: ${json}`);
    });
}

module.exports = {
    storeTicketSystemTransfer,
    storeTicketInmediates,
    storeTicketPhotoRetreats,
    storeTicketExternalRetreats,
    getSystemTransferCreate,
    getSystemTransferAssigned,
    getPhotoRetreats,
    getExernalRetreats,
    inactivateTicket,
    inactivatePhotoRetreats,
    inactivateExternalRetreats,
    completeTicket,
    completePhotoRetreats,
    getStore,
}