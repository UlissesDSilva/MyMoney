const express = require('express')

module.exports = function(server){

    //URL base para todas as rotas
    const router = express.Router()
    
    //Toda url que comece com "/api" será direciona para o middleware 'router'
    server.use('/api', router)

    //Mapeamento das rotas de Ciclo de Pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    // Registra em 'router'(nas rotas) todos os webServices rest definidos em 'billingCycleService' dentro de '/billingCycle'
    BillingCycle.register(router, '/billingCycles')
}

// Ao acessar '/api' será direcionado para o middleware 'router'
// No 'router' BillingCycle será mapeado para '/billingCycles'