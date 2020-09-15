'use strict'

const BinnacleSaleByte = require('../models/BinnacleSaleByte');
const BinnacleSaleByteBefore = require('../models/BinnacleSaleByteBefore');

const Moment = require('moment');
//Obtiene los colaboradores
async function getBinnacleSale(req, res) { 
    let sales = await BinnacleSaleByte.find({
        store_creat:"Guess Oakland"
    }).sort({ date_created: -1 }).limit(50);
    
    return res.json({sales});
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

    let params = req.body;
    let sale = new BinnacleSaleByte();
   
    sale.store_creat= params.store;
    sale.sale_daily = params.data.sales.venta_diaria; 
    sale.daily_goal = params.data.sales.meta;
    sale.year_before_sale = params.data.sales.venta_anterior;
    sale.manager= params.data.sales.encargado;
    sale.fact= params.data.sales.factoresDeVenta;
    //sale.compilance_manager = params.data.sales.;
    sale.people_totals= params.data.sales.no_personas;
    sale.sales_totals= params.data.sales.no_ventas;
    sale.diff= params.data.sales.faltante;
    //System
    sale.fac_sis_from= params.data.sales.facturas_sis_desde;
    sale.fac_sis_to= params.data.sales.facturas_sis_hasta;
    sale.total_sis= params.data.sales.facturas_sis_total;
    //manual
    sale.fac_man_from= params.data.sales.facturas_man_desde;
    sale.fac_man_to= params.data.sales.facturas_man_hasta;
    sale.total_man= params.data.sales.facturas_man_total;
    //COD
    sale.fact_send_CE_from= params.data.sales.facturas_cod_desde;
    sale.fact_send_CE_to= params.data.sales.facturas_cod_hasta;
    sale.fact_send_CEV= params.data.sales.facturas_cod_total;
    //note credito
    sale.fact_nt_c_f= params.data.sales.facturas_nota_desde;
    sale.fact_nt_c_to= params.data.sales.facturas_nota_hasta;
    sale.fact_nt_c= params.data.sales.facturas_nota_total;
    //Method
    sale.cash_quetzales= params.data.sales.efectivoQuetzales;
    sale.cash_dolares= params.data.sales.efectivoQuetzalesDolares;
    sale.credomatic= params.data.sales.credomatic;
    sale.visa= params.data.sales.visa;
    sale.visaOnline= params.data.sales.visaOnline;
    sale.visaDolares= params.data.sales.visaDolares;
    sale.masterCard= params.data.sales.masterCard;
    sale.credicuotas= params.data.sales.credicuotas;
    sale.visaCuotas= params.data.sales.visaCuotas;
    sale.numb_send_cash_value=params.data.sales.valorEnvioEfectivo;
    sale.lifeMilesNum= params.data.sales.lifeMilesNumber;
    sale.lifeMilesVa= params.data.sales.lifeMilesValor;
    sale.extIva= params.data.sales.exencionIva;
    sale.loyalty= params.data.sales.loyalty;
    sale.Authorized_Expenditure_v= params.data.sales.gastosAutorizados;
    sale.retreats= params.data.sales.retirosMercaderia;
    sale.total_on= params.data.sales.ventaEnLinea;
    sale.note_credit= params.data.sales.notaDeCredito;
    sale.missing= params.data.sales.faltante;
    sale.box_square=params.data.sales.cuadreDeCaja;
    sale.diference=params.data.sales.diferencia;
    sale.cashBackVa= params.data.sales.cashback;
    sale.giftcard= params.data.sales.giftcard;
    sale.obs_method= params.data.sales.observaciones;
    sale.ticket_quetzales="";
    sale.date_ticket_cash_quetzales=Date.now;
    sale.date_ticket_cash_dollars=Date.now;
    sale.ticket_dollars="";
    sale.date_created= defaultdate;
    sale.ticket_quetzales="";
    sale.date_update_conta = Date.now;
    sale.vendors = [];
    
    params.data.vendors.map(res => {
        let vendors = {
            name: res.nombre,
            venta: res.venta
        }
        sale.vendors.push(vendors);
    } )

    sale.vendorsDescount = [];

    params.data.vendorsDescount.map(res => {
        let vendorsDescount = {
            name: res.nombre,
            venta: res.venta
        }
        sale.vendorsDescount.push(vendorsDescount);
    } )

    await sale.save(async (err, sale) => {
        if (err) return res.status(500).send({ message: 'Error al crear dato de venta!' });
        if (sale) {
            console.log("Lo logramos")
        }
    });

    console.log(sale.vendorsDescount)

   return res.json({"response":"Yes!"});
}



module.exports = {
    getBinnacleSale,
    getBinnacleSaleReport,
    getBinnacleSaleReportBefore,
    getBinnacleSaleReportTotal,

    setBinnacleSalesCreate
}