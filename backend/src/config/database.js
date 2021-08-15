// mongoose: Mapeamento dos objetos para persistência no Mongodb
const mongoose = require('mongoose')

//Por questões de descontinuamento do Promise do mongoose
mongoose.Promise = global.Promise

const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost/mymoney'

module.exports = mongoose.connect(url, {useNewUrlParser: true})

const error = require('./messageError')
