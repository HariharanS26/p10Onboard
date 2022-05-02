'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const path_1 = __importDefault(require('path'))
const mongoose_1 = __importDefault(require('mongoose'))
const url = 'mongodb://localhost:27017/newTrial'
const app = (0, express_1.default)()
const port = process.env.npm_package_config_port || 3000
let runningMessage = 'Server is running on port ' + port + ' Hello!'
app.use(express_1.default.static(path_1.default.resolve(`${__dirname}`, './')))
app.use(express_1.default.json())
const server = app.listen(port, () => {
  console.log(runningMessage)
})
mongoose_1.default.connect(url)
const con = mongoose_1.default.connection
con.on('open', () => {
  console.log('connected to db..')
})
const flightSearch = require('../Server/tempFlightView.js')
app.use('/tempFlightView', flightSearch)
const bookTicket = require('../Server/bookTickets.js')
app.use('/bookTickets', bookTicket)
const showTicket = require('../Server/showTickets.js')
app.use('/showTickets', showTicket)
module.exports = server
