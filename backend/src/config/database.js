// mongoose: Mapeamento dos objetos para persistência no Mongodb
const mongoose = require('mongoose')

//Por questões de descontinuamento do Promise do mongoose
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/mymoney', { useNewUrlParser: true })

const error = require('./messageError')
