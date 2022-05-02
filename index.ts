import express from 'express'
import path from 'path'
import mongoose from 'mongoose';
const url = "mongodb://localhost:27017/newTrial";
const app = express();
const port = process.env.npm_package_config_port || 3000;
let runningMessage = 'Server is running on port ' + port + " Hello!";


app.use(express.static(path.resolve(`${__dirname}`, './')))
app.use(express.json())

const server = app.listen(port, () => {
    console.log(runningMessage);
});

mongoose.connect(url)
const con = mongoose.connection

con.on('open', () => {
    console.log('connected to db..')
})

const flightSearch = require('../Server/tempFlightView.js')
app.use('/tempFlightView', flightSearch)

const bookTicket = require('../Server/bookTickets.js')
app.use('/bookTickets', bookTicket)

const showTicket = require('../Server/showTickets.js')
app.use('/showTickets', showTicket)


module.exports = server;