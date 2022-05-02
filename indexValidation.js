const origin = document.getElementById('origin')
const destination = document.getElementById('destination')
const dateString = document.getElementById('date')
const seats = document.getElementById('seats')
const formSearch = document.getElementById('formSearch')
const errorElement = document.getElementById('error')
const submitbtn = document.getElementById('formsubmit')

var today = new Date().toISOString().slice(0, 10)

formSearch.addEventListener('submit', (e) => {
  let messages = []

  if (dateString.value === '' || dateString.value === null) {
    messages.push('Date is required')
  } else if (dateString.value < today) {
    messages.push('Enter valid date')
  } else {
    errorElement.innerText = ''
  }

  if (origin.value === '' || origin.value === null) {
    messages.push('Origin Field required')
  } else {
    errorElement.innerText = ''
  }

  if (destination.value === '' || destination.value === null) {
    messages.push('Destination Field required')
  } else {
    errorElement.innerText = ''
  }

  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = '*' + messages.join(', ')
    errorElement.style.color = 'rgb(255, 6, 6)'
    errorElement.style.fontSize = '20px'
  }
})
