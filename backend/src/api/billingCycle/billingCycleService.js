const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true})

//Intercepta a requisição após tenta executar o method
BillingCycle.after('post', errorHandler).after('put', errorHandler)

// BillingCycle.route('get', (req, res, next) => {
//     BillingCycle.find({}, (err, docs) => {
//         if(!err)
//             res.json(docs)
//         else
//             res.status(500).json({errors: [error]})
//     })
// })

BillingCycle.route('count', (req, res, next) => {
    // Pega a quantidade de elemento da tabela
    BillingCycle.count((error, value /*values é a quantidade de registro na tablea*/) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{ 
        // Projeto um campo 'credit' com a soma de todos os creditos e um campo deebt com a soma de todos os debitos
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        // Agrupa os valores se baseando em algum critério. Vai transforma a quantidade de registro em um único registro consolidado de registro
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        // Resultado final do aggregate, retirando o _id
        $project: {_id: 0, credit: 1, debt: 1}
    }]).exec((error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            // Pelo aggregate result só tem uma posição
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
})

module.exports = BillingCycle