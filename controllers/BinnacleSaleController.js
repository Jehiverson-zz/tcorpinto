'use strict'
const nodemailer = require('nodemailer');
const BinnacleSaleByte = require('../models/BinnacleSaleByte');
const BinnacleSaleByteBefore = require('../models/BinnacleSaleByteBefore');
let Moment = require("moment-timezone");
let momentToday = require("moment");
    let hoy = Moment().tz("America/Guatemala")._d;
    let dd = hoy.getDate();
    let mm = hoy.getMonth() + 1;
    let yyyy = hoy.getFullYear();
//Obtiene los colaboradores
async function getBinnacleSale(req, res) { 

    const dataStore = [];
    var salesNew = await BinnacleSaleByte.find({
        date_created: { $regex: "2020-08" },
    });

    var salesBefore_2020 = await BinnacleSaleByteBefore.find({
        date_created: { $gte:"2020-01-01T19:02:12.501+00:00", $lt:"2020-08-18T19:02:12.501+00:00" },
    });

    salesNew.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diff,

                        "factura_sistema_de": res.fac_sis_from,
                        "factura_sistema_hasta": res.fac_sis_to,
                        "total_sistema": res.total_sis,

                        "factura_manual_de": res.fac_man_from,
                        "factura_manual_hasta": res.fac_man_to,
                        "total_manual": res.total_man,

                        "nota_credito_de": res.fact_nt_c_f,
                        "nota_credito_hasta": res.fact_nt_c_to,
                        "nota_credito_total": res.fact_nt_c,

                        "total_online": res.total_on,

                        "efectivo_quetzales": res.cash_quetzales,
                        "efectivo_dolares": res.cash_dolares,
                        
                        "credomatic": res.credomatic,
                        "visa": res.visa,
                        "visa_dolares": res.visaDolares,
                        "masterCard": res.masterCard,
                        "crediCuotas": res.credicuotas,
                        "visaCuotas": res.visaCuotas,

                        "factura_send_contra_entrega_desde": res.fact_send_CE_from,
                        "factura_send_contra_entrega_hasta": res.fact_send_CE_to,
                        "factura_send_contra_entrega_total": res.fact_send_CEV,

                        "nota_de_credito": res.note_credit,
                        "ticket_quetzales": res.ticket_quetzales,
                        "missing": res.missing,
                        "cuadre_de_caja": res.box_square,
                        "Numero_de_envio_en_efectivo": res.numb_send_cash_value,
                        "Numero_Life_Miles": res.lifeMilesNum,
                        "Numero_Life_Miles_Valor": res.lifeMilesVa,
                        "Execto_iva": res.extIva,
                        "Loyalty": res.loyalty,
                        "Gasto_Autorizado": res.Authorized_Expenditure_v,
                        "Retiros": res.retreats,
                        "Cashback_valor": res.cashBackVa,
                        "Giftcard": res.giftcard,
                        "Observacion_Metodos": res.obs_method,
                        "Factores_que_afectaron_venta": res.fact
                    })
    })

    salesBefore_2020.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diff,

                        "factura_sistema_de": res.fac_sis_from,
                        "factura_sistema_hasta": res.fac_sis_to,
                        "total_sistema": res.total_sis,

                        "factura_manual_de": res.fac_man_from,
                        "factura_manual_hasta": res.fac_man_to,
                        "total_manual": res.total_man,

                        "nota_credito_de": res.fact_nt_c_f,
                        "nota_credito_hasta": res.fact_nt_c_to,
                        "nota_credito_total": res.fact_nt_c,

                        "total_online": res.total_on,

                        "efectivo_quetzales": res.cash_quetzales,
                        "efectivo_dolares": res.cash_dolares,
                        
                        "credomatic": res.credomatic,
                        "visa": res.visa,
                        "visa_dolares": res.visaDolares,
                        "masterCard": res.masterCard,
                        "crediCuotas": res.credicuotas,
                        "visaCuotas": res.visaCuotas,

                        "factura_send_contra_entrega_desde": res.fact_send_CE_from,
                        "factura_send_contra_entrega_hasta": res.fact_send_CE_to,
                        "factura_send_contra_entrega_total": res.fact_send_CEV,

                        "nota_de_credito": res.note_credit,
                        "ticket_quetzales": res.ticket_quetzales,
                        "missing": res.missing,
                        "cuadre_de_caja": res.box_square,
                        "Numero_de_envio_en_efectivo": res.numb_send_cash_value,
                        "Numero_Life_Miles": res.lifeMilesNum,
                        "Numero_Life_Miles_Valor": res.lifeMilesVa,
                        "Execto_iva": res.extIva,
                        "Loyalty": res.loyalty,
                        "Gasto_Autorizado": res.Authorized_Expenditure_v,
                        "Retiros": res.retreats,
                        "Cashback_valor": res.cashBackVa,
                        "Giftcard": res.giftcard,
                        "Observacion_Metodos": res.obs_method,
                        "Factores_que_afectaron_venta": res.fact
                    })
    })
    
    return res.json({salesNew});
}
//Obtiene los colaboradores date_created: { $regex: dateSales },
async function getBinnacleSaleReport(req, res) { 
    const dataStore = [];
    let salesNew = await BinnacleSaleByte.find({
        date_created: { $regex: "2020-08" },
    });

    let salesBefore_2020 = await BinnacleSaleByteBefore.find({
        date_created: { $gte:"2020-01-01T19:02:12.501+00:00", $lt:"2020-08-18T19:02:12.501+00:00" },
    });

    salesNew.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diff,

                        "factura_sistema_de": res.fac_sis_from,
                        "factura_sistema_hasta": res.fac_sis_to,
                        "total_sistema": res.total_sis,

                        "factura_manual_de": res.fac_man_from,
                        "factura_manual_hasta": res.fac_man_to,
                        "total_manual": res.total_man,

                        "nota_credito_de": res.fact_nt_c_f,
                        "nota_credito_hasta": res.fact_nt_c_to,
                        "nota_credito_total": res.fact_nt_c,

                        "total_online": res.total_on,

                        "efectivo_quetzales": res.cash_quetzales,
                        "efectivo_dolares": res.cash_dolares,
                        
                        "credomatic": res.credomatic,
                        "visa": res.visa,
                        "visa_dolares": res.visaDolares,
                        "masterCard": res.masterCard,
                        "crediCuotas": res.credicuotas,
                        "visaCuotas": res.visaCuotas,

                        "factura_send_contra_entrega_desde": res.fact_send_CE_from,
                        "factura_send_contra_entrega_hasta": res.fact_send_CE_to,
                        "factura_send_contra_entrega_total": res.fact_send_CEV,

                        "nota_de_credito": res.note_credit,
                        "ticket_quetzales": res.ticket_quetzales,
                        "missing": res.missing,
                        "cuadre_de_caja": res.box_square,
                        "Numero_de_envio_en_efectivo": res.numb_send_cash_value,
                        "Numero_Life_Miles": res.lifeMilesNum,
                        "Numero_Life_Miles_Valor": res.lifeMilesVa,
                        "Execto_iva": res.extIva,
                        "Loyalty": res.loyalty,
                        "Gasto_Autorizado": res.Authorized_Expenditure_v,
                        "Retiros": res.retreats,
                        "Cashback_valor": res.cashBackVa,
                        "Giftcard": res.giftcard,
                        "Observacion_Metodos": res.obs_method,
                        "Factores_que_afectaron_venta": res.fact
                    })
    })

    salesBefore_2020.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diff,

                        "factura_sistema_de": res.fac_sis_from,
                        "factura_sistema_hasta": res.fac_sis_to,
                        "total_sistema": res.total_sis,

                        "factura_manual_de": res.fac_man_from,
                        "factura_manual_hasta": res.fac_man_to,
                        "total_manual": res.total_man,

                        "nota_credito_de": res.fact_nt_c_f,
                        "nota_credito_hasta": res.fact_nt_c_to,
                        "nota_credito_total": res.fact_nt_c,

                        "total_online": res.total_on,

                        "efectivo_quetzales": res.cash_quetzales,
                        "efectivo_dolares": res.cash_dolares,
                        
                        "credomatic": res.credomatic,
                        "visa": res.visa,
                        "visa_dolares": res.visaDolares,
                        "masterCard": res.masterCard,
                        "crediCuotas": res.credicuotas,
                        "visaCuotas": res.visaCuotas,

                        "factura_send_contra_entrega_desde": res.fact_send_CE_from,
                        "factura_send_contra_entrega_hasta": res.fact_send_CE_to,
                        "factura_send_contra_entrega_total": res.fact_send_CEV,

                        "nota_de_credito": res.note_credit,
                        "ticket_quetzales": res.ticket_quetzales,
                        "missing": res.missing,
                        "cuadre_de_caja": res.box_square,
                        "Numero_de_envio_en_efectivo": res.numb_send_cash_value,
                        "Numero_Life_Miles": res.lifeMilesNum,
                        "Numero_Life_Miles_Valor": res.lifeMilesVa,
                        "Execto_iva": res.extIva,
                        "Loyalty": res.loyalty,
                        "Gasto_Autorizado": res.Authorized_Expenditure_v,
                        "Retiros": res.retreats,
                        "Cashback_valor": res.cashBackVa,
                        "Giftcard": res.giftcard,
                        "Observacion_Metodos": res.obs_method,
                        "Factores_que_afectaron_venta": res.fact
                    })
    })
    console.log("Fue",salesNew);
    return res.json({dataStore});
}

async function getBinnacleSaleReportBefore(req, res) {
    const dataStore = [];
    let dateInic = req.params.id +"-01-01T19:02:12.501+00:00"
    let dateFin = req.params.id +"-12-31T19:02:12.501+00:00"
    console.log(dateInic,dateFin)
    let salesBefore = await BinnacleSaleByteBefore.find({
        date_created: { $gte: dateInic, $lt: dateFin },
    });

    salesBefore.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diff,

                        "factura_sistema_de": res.fac_sis_from,
                        "factura_sistema_hasta": res.fac_sis_to,
                        "total_sistema": res.total_sis,

                        "factura_manual_de": res.fac_man_from,
                        "factura_manual_hasta": res.fac_man_to,
                        "total_manual": res.total_man,

                        "nota_credito_de": res.fact_nt_c_f,
                        "nota_credito_hasta": res.fact_nt_c_to,
                        "nota_credito_total": res.fact_nt_c,

                        "total_online": res.total_on,

                        "efectivo_quetzales": res.cash_quetzales,
                        "efectivo_dolares": res.cash_dolares,
                        
                        "credomatic": res.credomatic,
                        "visa": res.visa,
                        "visa_dolares": res.visaDolares,
                        "masterCard": res.masterCard,
                        "crediCuotas": res.credicuotas,
                        "visaCuotas": res.visaCuotas,

                        "factura_send_contra_entrega_desde": res.fact_send_CE_from,
                        "factura_send_contra_entrega_hasta": res.fact_send_CE_to,
                        "factura_send_contra_entrega_total": res.fact_send_CEV,

                        "nota_de_credito": res.note_credit,
                        "ticket_quetzales": res.ticket_quetzales,
                        "missing": res.missing,
                        "cuadre_de_caja": res.box_square,
                        "Numero_de_envio_en_efectivo": res.numb_send_cash_value,
                        "Numero_Life_Miles": res.lifeMilesNum,
                        "Numero_Life_Miles_Valor": res.lifeMilesVa,
                        "Execto_iva": res.extIva,
                        "Loyalty": res.loyalty,
                        "Gasto_Autorizado": res.Authorized_Expenditure_v,
                        "Retiros": res.retreats,
                        "Cashback_valor": res.cashBackVa,
                        "Giftcard": res.giftcard,
                        "Observacion_Metodos": res.obs_method,
                        "Factores_que_afectaron_venta": res.fact
                    })
    })

    return res.json({dataStore});
}

async function getBinnacleSaleReportTotal(req, res) { 
    const dataStore = [];
    let salesNew = await BinnacleSaleByte.find({
        date_created: { $regex: "2020" }
    },{date_created:1,store_creat:1,sale_daily:1,manager:1,year_before_sale:1});

    let salesBefore_2020 = await BinnacleSaleByteBefore.find({
        date_created: { $gte:"2015-01-01T19:02:12.501+00:00", $lt:"2020-08-18T19:02:12.501+00:00" },
    },{date_created:1,store_creat:1,sale_daily:1,manager:1,year_before_sale:1,daily_goal:1});

    salesNew.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diff
                    })
    })

    salesBefore_2020.map((res) =>{
        let fecha = Moment(res.date_created).format('YYYY-MM-DDT08:00:00.80Z')
        dataStore.push({"fechaCreacion": fecha, 
                        "Dia":Moment(fecha).format('DD'),
                        "Mes":Moment(fecha).format('MM'),
                        "Año":Moment(fecha).format('YYYY'),
                        "tienda": res.store_creat,
                        "ventas": res.sale_daily,
                        "metas": res.daily_goal,
                        "venta_año_anterior": res.year_before_sale,
                        "total_personas": res.people_totals,
                        "total_vendores": res.sales_totals,
                        "manager": res.manager,
                        "fact": res.fact,
                        "diferencia": res.diffy
                    })
    })

    return res.json({dataStore});
}

async function setBinnacleSalesCreate(req, res) { 
    var defaultdate = require("moment-timezone")
    .tz("America/Guatemala")
    .format("YYYY-MM-DD");

    var dateEmail  = Moment().tz('America/Guatemala').format('DD/MM/YYYY')
    let params = req.body;
    let sale = new BinnacleSaleByte();
   
    sale.store_creat= params.store;
    sale.sale_daily = params.sales.venta_diaria; 
    sale.daily_goal = params.sales.meta;
    sale.year_before_sale = params.sales.venta_anterior;
    sale.manager= params.sales.encargado;
    sale.fact= params.sales.factoresDeVenta;
    //sale.compilance_manager = params.sales.;
    sale.people_totals= params.sales.no_personas;
    sale.sales_totals= params.sales.no_ventas;
    sale.diff= params.sales.faltante;
    //System
    sale.fac_sis_from= params.sales.facturas_sis_desde;
    sale.fac_sis_to= params.sales.facturas_sis_hasta;
    sale.total_sis= params.sales.facturas_sis_total;
    //manual
    sale.fac_man_from= params.sales.facturas_man_desde;
    sale.fac_man_to= params.sales.facturas_man_hasta;
    sale.total_man= params.sales.facturas_man_total;
    //COD
    sale.fact_send_CE_from= params.sales.facturas_cod_desde;
    sale.fact_send_CE_to= params.sales.facturas_cod_hasta;
    sale.fact_send_CEV= params.sales.facturas_cod_total;
    //note credito
    sale.fact_nt_c_f= params.sales.facturas_nota_desde;
    sale.fact_nt_c_to= params.sales.facturas_nota_hasta;
    sale.fact_nt_c= params.sales.facturas_nota_total;
    //Method
    sale.cash_quetzales= params.sales.efectivoQuetzales;
    sale.cash_dolares= params.sales.efectivoQuetzalesDolares;
    sale.credomatic= params.sales.credomatic;
    sale.visa= params.sales.visa;
    sale.visaOnline= params.sales.visaOnline;
    sale.visaDolares= params.sales.visaDolares;
    sale.masterCard= params.sales.masterCard;
    sale.credicuotas= params.sales.credicuotas;
    sale.visaCuotas= params.sales.visaCuotas;
    sale.numb_send_cash_value=params.sales.valorEnvioEfectivo;
    sale.lifeMilesNum= params.sales.lifeMilesNumber;
    sale.lifeMilesVa= params.sales.lifeMilesValor;
    sale.extIva= params.sales.exencionIva;
    sale.loyalty= params.sales.loyalty;
    sale.Authorized_Expenditure_v= params.sales.gastosAutorizados;
    sale.retreats= params.sales.retirosMercaderia;
    sale.total_on= params.sales.ventaEnLinea;
    sale.note_credit= params.sales.notaDeCredito;
    sale.missing= params.sales.faltante;
    sale.box_square=params.sales.cuadreDeCaja;
    sale.diference=params.sales.diferencia;
    sale.cashBackVa= params.sales.cashback;
    sale.giftcard= params.sales.giftcard;
    sale.obs_method= params.sales.observaciones;
    sale.ticket_quetzales="";
    sale.date_ticket_cash_quetzales=Date.now();
    sale.date_ticket_cash_dollars=Date.now();
    sale.ticket_dollars="";
    sale.date_created= defaultdate;
    sale.ticket_quetzales="";
    sale.date_update_conta = Date.now();
    sale.vendors = [];
    
    params.vendors.map(res => {
        let vendors = {
            name: res.nombre,
            sale: res.venta
        }
        sale.vendors.push(vendors);
    } )

    sale.vendorsDescount = [];

    params.vendorsDescount.map(res => {
        let vendorsDescount = {
            name: res.nombre,
            sale: res.venta
        }
        sale.vendorsDescount.push(vendorsDescount);
    } )
    var emailValid = false
    await sale.save(async (err, sale) => {
        if (err) return res.status(500).send({ valid: false });
        if (sale) {
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
            await transporter.sendMail({
                from: '"Datos de venta" <soporte@tickets.corpinto.com>', // sender address
                to: "jehivis@gmail.com", // list of receivers
                cc: params.email,
                subject:
                    `Dato de venta diaria ${dateEmail} de la tienda ${sale.store_creat}`,
                text: "", // plain text body
                html: `<table border="0" align="left" width="590" cellpadding="0" cellspacing="0" class="container590">
                   
                <tr>
                    <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center"
                        style="color: #343434; font-size: 20px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;"
                        class="main-header">


                        <div style="line-height: 35px">

                            <span style="color: #5caad2;">${sale.store_creat}</span> Venta Q. ${sale.sale_daily}

                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <table border="0" width="400" align="left" cellpadding="0" cellspacing="0"
                            class="container590">
                            <tr>
                                <td align="left" style="color:black">

                                    <b style="color:black">Meta:</b><p>${sale.daily_goal}</p><br>
                                    <b style="color:black">Venta Año Anterior:</b><p>${sale.year_before_sale}</p><br>
                                    <b style="color:black">Encargado:</b><p>${sale.manager}</p><br>
                                    <b style="color:black">Clíentes:</b><p>${sale.people_totals}</p><br>
                                    <b style="color:black">Ventas:</b><p>${sale.sales_totals}</p><br>
                                    <b style="color:black">Total de los vendedores:</b><br>
                                    ${
                                        sale.vendors.map((x,i) => {
                                            return (
                                               `<p style="color:black">
                                                    <b style="color:black">
                                                        ${i+1} Vendedor:</b> 
                                                            ${x.name} 
                                                    <b style="color:black">
                                                        Venta:</b> 
                                                            ${x.sale}
                                                </p>`
                                            )
                                        })
                                    }
                                   
                                    ${
                                        sale.vendorsDescount.map((x,i) => {
                                            return (
                                                `
                                                ${
                                                    i===0? `<b style="color:black">Total Descuento Vendedores:</b><br>`: ``
                                                  }
                                                <p style="color:black"><b style="color:black">${i+1}. Vendedor:</b> ${x.name} <b style="color:black">Descuento:</b> Q. ${x.sale}</p>`
                                            )
                                        })
                                    }
                                    <b style="color:black">Factores que afectaron la venta:</b> <h2 for="" style="color:black">${sale.fact}</h2>

                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>




            </table>`, // html body
            }, async function (err, json) {
                if(err) console.log("Error en el Mensaje!")  
                if(json){console.log("Mensaje Enviado!")}
            });
            
        }
        emailValid = true
    });   
    setTimeout(function(){ 
        if(emailValid === true){
            return res.json({status:true, message: 'Dato de venta creado exitosamente!', color:"green" });
        }else{
            return res.json({status:false, message: 'Oups! Tenemos un error a enviar correo, puedes intentar ingresarlo de nuevo', color:"red" });
        }
     }, 2000);
    
}
/* Valida si existe un dato de venta anterior*/
async function validationDataSale(req, res) {
    var mm_f = 0;
    if(mm > 9){
        mm_f = mm  
    }else{
        mm_f = "0"+mm
    } 
    const dateValid = yyyy+"-"+mm_f+"-"+dd;
    
    let salesNew = await BinnacleSaleByte.find({
        date_created: { $regex: Moment().tz('America/Guatemala').format('YYYY-MM-DD') }
    },{date_created:1,store_creat:1,sale_daily:1,manager:1,year_before_sale:1});
    //console.log(Moment().tz('America/Guatemala').format('YYYY-MM-DD'),dateValid)
    console.log(salesNew)
    return res.json({salesNew});
}

module.exports = {
    getBinnacleSale,
    getBinnacleSaleReport,
    getBinnacleSaleReportBefore,
    getBinnacleSaleReportTotal,
    validationDataSale,
    setBinnacleSalesCreate
}