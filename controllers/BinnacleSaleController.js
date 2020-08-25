'use strict'

const BinnacleSaleByte = require('../models/BinnacleSaleByte');
const Moment = require('moment');
//Obtiene los colaboradores
async function getBinnacleSale(req, res) { 
    let sales = await BinnacleSaleByte.find({
        store_creat:"Guess Oakland"
    }).sort({ date_created: -1 }).limit(50);
    
    return res.json({sales});
}

//Obtiene los colaboradores
async function getBinnacleSaleReport(req, res) { 
    const dataStore = [];
    let sales = await BinnacleSaleByte.find().sort({ date_created: -1 });

    sales.map((res) =>{
        dataStore.push({"fechaCreacion": new Date(res.date_created), 
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

module.exports = {
    getBinnacleSale,
    getBinnacleSaleReport
}