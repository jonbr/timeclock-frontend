var myModal = document.getElementById('logInForm')

myModal.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log('---login---')
  console.log(myModal)
  if (!data) {
    return event.preventDefault() // stops modal from being shown
  }
})