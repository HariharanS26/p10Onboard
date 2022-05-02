const express = require('express')
const router = express.Router()
const bookings = require('./models/bookTickets.js')
const store = require('store2')

router.get('/', async (req, res) => {
  try {
    const ticketObject = store('ticketObject')
    const book = await bookings.find(
      {
        $and: [
          { email: ticketObject.resEmail },
          { fname: ticketObject.resFname },
        ],
      },
      { _id: 1 },
    )
    console.log(book)
    res.send(
      `
      <form style=" font-size: 30px ; background-color: aquamarine;">

            <label>First Name - </label>
            <br>
            <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="fname" name="fname"
                class="fname" value = ` +
        ticketObject.resFname +
        `  readonly>
            <br>
            
            <label>Last Name - </label>
            <br>
            <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="lname" name="lname"
                class="lname" value = ` +
        ticketObject.resLname +
        `  readonly>
            <br>
            <label>Age - </label>
            <br>
            <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="Age" name="Age"
                class="Age" value = ` +
        ticketObject.resAge +
        ` readonly>
            <br>
            <label>Gender - </label>
            <br>
            <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="Gender" name="Gender"
                class="Gender" value = ` +
        ticketObject.resGender +
        `  readonly>
            <br>
            
            <label>Email - </label>
            <br>
            <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="email" id="Email" name="Email"
                class="Email" value = ` +
        ticketObject.resEmail +
        `  readonly>
            <br>
            <label>Phone Number - </label>
            <br>
            <input style="width: 50%; font-size: 25px ; margin-left: 20px;" type="text" id="Pnumber" name="Pnumber"
                class="Pnumber" value = ` +
        ticketObject.resNumber +
        `  readonly>
            <br>
            <br>
            <label> Booking Success </label>
            <br>
            <br>
            <label> For future reference save the Unique Trip ID - </label><br>
            <label>` +
        book[0]._id +
        `
          
        </form>
        
      `,
    )
  } catch (err) {
    console.log('Error' + err)
  }
})

module.exports = router
