const _ = require('lodash')

module.exports = (req, res, next) => {
    // Objecto com detalhes de erros, dados, etc...
    const bundle = res.locals.bundle

    if(bundle.errors){
        const errors = parseErrors(bundle.errors)
        res.status(400).json({errors})
    }else{
        next()
    }
}

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push({error: error.message, code:400}))
    return errors
}