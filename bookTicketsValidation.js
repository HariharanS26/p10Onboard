const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const Age = document.getElementById('Age')
const Gender = document.getElementById('Gender')
const Email = document.getElementById('Email')
const MNumber = document.getElementById('Number')
const errorElement = document.getElementById('error')
const submitbtn = document.getElementById('formsubmit')

var today = new Date().toISOString().slice(0, 10)

formSearch.addEventListener('submit', (e) => {
  let messages = []

  if (fname.value === '' || fname.value === null) {
    messages.push('First Name is required')
  } else if (fname.value.length >= 20) {
    messages.push('Max 20 characters allowed in First name')
  } else {
    errorElement.innerText = ''
  }

  if (lname.value === '' || lname.value === null) {
    messages.push('Last Name is required')
  } else if (lname.value.length >= 20) {
    messages.push('Max 20 characters allowed in Last name')
  } else {
    errorElement.innerText = ''
  }

  if (Age.value === '' || Age.value === null) {
    messages.push('Age is required')
  } else if (Age.value < 18) {
    messages.push('Age should be below 18')
  } else if (Age.value > 999) {
    messages.push('Age is must not cross 3 digits')
  } else {
    errorElement.innerText = ''
  }

  if (Gender.value === '' || Gender.value === null) {
    messages.push('Gender Field required')
  } else {
    errorElement.innerText = ''
  }

  if (Email.value === '' || Email.value === null) {
    messages.push('Email Field required')
  } else {
    errorElement.innerText = ''
  }

  if (MNumber.value === '' || MNumber.value === null) {
    messages.push('Number Field required')
  } else if (MNumber.value.length !== 10) {
    messages.push('Enter valid 10 digit number')
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
