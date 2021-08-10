const express = require('express')
const auth = require('./auth')

module.exports = function(server){

    // Proteger as rotas que comecem com '/api' - Rotas protegidas pelo jwt
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    // Middleware de autenticação é aplicado para todos que forem contemplados pelo 'protected'
    protectedApi.use(auth)

    //Mapeamento das rotas de Ciclo de Pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    // Registra em 'protectedApi'(nas rotas) todos os webServices rest definidos em 'billingCycleService' dentro de '/billingCycle'
    BillingCycle.register(protectedApi, '/billingCycles')

    // Rotas abertas
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}

// Ao acessar '/api' será direcionado para o middleware 'protectedApi'
// No 'protectedApi' BillingCycle será mapeado para '/billingCycles' e estará protegido