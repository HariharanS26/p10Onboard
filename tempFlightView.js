const express = require('express')
const bodyParser = require('body-parser')
const tempFlightView = require('./models/tempFlightView.js')
const router = express.Router()
const flights = require('./models/tempFlightView.js')
const cors = require('cors')
router.use(cors())
const localStorage = require('node-localstorage')
const store = require('store2')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/', async (req, res, next) => {
  try {
    const value_origin = req.body.origin
    const value_destination = req.body.destination
    const value_date = req.body.date
    const value_seats = req.body.seats
    const flight = await flights.find(
      { $and: [{ origin: value_origin }, { destination: value_destination }] },
      { _id: 0 },
    )
    value_airlines = flight[0].airlines
    const flightObject = {
      resAirlines: value_airlines,
      resOrigin: value_origin,
      resDestination: value_destination,
      resDate: value_date,
      resSeats: value_seats,
    }
    store('flightObject', flightObject)

    res.send(
      `
      <head>
        <title>Let's Go Airlines</title>
        <link rel="icon" type="image/png" href="./Images/32x32.png">
      </head>  
      <div class="header" id="myHeader">
        <img src="./Images/logo.png" width="200" height="150">
        <p class="title" style = " -webkit-text-stroke: 1px black;
        font-family: Georgia;
        font-weight: bold;
        color: aliceblue;
        text-align: center;
        margin-top: -135px;
        margin-bottom: 50px;
        font-size: 80px;
        float: left;
        padding: 10px 16px;
        background: rgb(49, 50, 51);
        color: #f1f1f1;
        width: 98%;">Let's Go Airlines</p>
        
      </div>
      <p style="font-size: 40px;
      background-color: rgb(80, 80, 80);
      color: #f1f1f1;
      padding: 20px;">Results of flight enquiry</p>
        <table border = "5px" style="width: 90%; margin-left: 5%; font-size: 30px">
            <tr>
                <th><h4 align ="center">Airlines</h4></th>
                <th><h4 align ="center">Origin</h4></th>
                <th><h4 align ="center">Destination</h4></th>
                <th><h4 align ="center">Date</h4></th>
                <th><h4 align ="center">No of seats</th>
                <th><h4 align ="center">Book Ticket</h4></th>
            </tr>
            <tr>
                <td class="resairlines">` +
        flight[0].airlines +
        `</td>
                <td class="resOrigin">` +
        flight[0].origin +
        `</td>
                <td class="resDestination">` +
        flight[0].destination +
        `</td>
                <td class="resDate">` +
        value_date +
        `</td>
                <td class="resSeats">` +
        value_seats +
        `</td>
                <td align="center"><input  style= "font-size:30px" class="inputformat" type="submit" value="Book" onclick="location.reload();location.href='/bookTickets'" /></td>
            </tr>
        </table>`,
    )
  } catch (err) {
    res.send('Error ' + err)
  }
})

module.exports = router
