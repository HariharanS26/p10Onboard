const mongoose = require('mongoose')

const tempFlightViewSchema = new mongoose.Schema({
  airlines: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  seats: {
    total: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
      required: true,
    },
    booked: {
      type: Number,
      required: true,
    },
  },
})

module.exports = mongoose.model('flights', tempFlightViewSchema)
