// const port = process.env.PORT || 3003
const port = process.env.PORT ? process.env.PORT : 3003
const express = require('express')
const bodyParser = require('body-parser')
const allowcors = require('./cors')
const queryParser = require('express-query-int')
const server = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowcors)
server.use(queryParser()) //Transforma o parametro da query de string para inteiro

server.listen(port, () => {console.log(`Server rodando na porta: ${port}`)})

module.exports = server