// mongoose: Mapeamento dos objetos para persistência no Mongodb
const mongoose = require('mongoose')

//Por questões de descontinuamento do Promise do mongoose
mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb+srv://UlissesDSilva:<ulijapp190108>@mymoney-backend.vswmi.mongodb.net/MyMoney-Backend?retryWrites=true&w=majority', { useNewUrlParser: true })

const error = require('./messageError')
