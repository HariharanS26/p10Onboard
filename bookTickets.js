const express = require('express')
const router = express.Router()
const bookings = require('./models/bookTickets.js')
const bodyParser = require('body-parser')
const store = require('store2')
router.get('/', async (req, res) => {
  try {
    const flightObject = store('flightObject')
    res.send(
      `
    <!DOCTYPE html>
    <html>

    <head>
        <title>Let's Go Book Tickets</title>
        <link rel="icon" type="image/png" href="./Images/32x32.png">

        <script>
          function htmlStore() {
            const store = require('store2')
            const fname = getElementById('fname').value
            const htmlObject = {
                FirstName: fname
            }
            store('htmlObject', htmlObject)
        </script>

    </head>

    <body>
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
        <div>
          <p style="font-size: 40px;
          background-color: rgb(80, 80, 80);
          color: #f1f1f1;
          padding: 20px;">Book Tickets</p>
        </div>
        <div align = 'right' style = "margin-right: 100px;">
            <input style=" background-color: rgb(95, 94, 95); color: white; text-align: center; font-size: 25px;" value = 'Home' onclick = "location.reload();location.href='/'">
            <br><br>
        </div>
        <div id="errorMessage">

        </div>

        <div>
            <form style="width: 90%; font-size: 30px ; margin-left: 5%; background-color: aquamarine;" method = 'post' action = 'http://localhost:3001/bookTickets'>
                <label>Airlines - </label>
                <br>
                <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="resAirlines" value = ` +
        flightObject.resAirlines +
        ` readonly>
                <br>
                <label>Origin - </label>
                <br>
                <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="resOrigin" value = ` +
        flightObject.resOrigin +
        ` readonly>
                <br>
                <label>Destination - </label>
                <br>
                <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="resDestination" value = ` +
        flightObject.resDestination +
        ` readonly>
                <br>
                <label>Date - </label>
                <br>
                <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="date" id="resDate" value = ` +
        flightObject.resDate +
        ` readonly>
                <br>
                <label>Seats - </label>
                <br>
                <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="number" id="resSeats" value = ` +
        flightObject.resSeats +
        ` readonly>
                <br>
                <br>
        </form>

        </div>
        <div style="width: 90%; margin-left: 5%;">
        <iframe  style="overflow: hidden; width:100%; height: 800px; " frameBorder="0" src="bookTickets.html"></iframe>
        </div>
        <div>
        <input type="button"  style=" font-size: 30px ; margin-left: 5%; background-color: rgb(95, 94, 95); color: white; text-align: center;" id = "print" value = "Print" onclick = "window.print()">
        </div>

    </body>

    </html>

    `,
    )
  } catch (err) {
    console.log('Error' + err)
  }
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.post('/', async (req, res) => {
  const flightObject = store('flightObject')
  const ticketObject = {
    resFname: req.body.fname,
    resLname: req.body.lname,
    resAge: req.body.Age,
    resGender: req.body.Gender,
    resEmail: req.body.Email,
    resNumber: req.body.Pnumber,
  }
  store('ticketObject', ticketObject)
  const book = new bookings({
    airlines: flightObject.resAirlines,
    origin: flightObject.resOrigin,
    destination: flightObject.resDestination,
    date: flightObject.resDate,
    seats: flightObject.resSeats,
    fname: req.body.fname,
    lname: req.body.lname,
    age: req.body.Age,
    gender: req.body.Gender,
    email: req.body.Email,
    number: req.body.Pnumber,
  })
  try {
    const b1 = await book.save()
    res.redirect('http://localhost:3001/showTickets.html')
  } catch (err) {
    console.log('Error' + err)
  }
})

module.exports = router
