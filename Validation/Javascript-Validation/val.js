// Javascript for js-validation-1.html

// There are many ways to pick a DOM node; here we //get the form itself and the email
// input box, as well as the span element into which //we will place the error message.

var form = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
  // Whenever somethign is typed into a //field it is checked for validity
  if (email.validity.valid) {
    // If there is a visible error msg,
    // if the field is valid, we remove //the error msg.
    error.innerHTML = ""; // Reset msg 
    error.className = "error"
    // Reset visual state of the msg
  }
}, false);
form.addEventListener("submit", function (event) {
  // Each time the data is sent we check // if the email field is valid
  if (!email.validity.valid) {

    // If the field is not valid
    // display custom error msg.
    error.innerHTML = "Enter a valid email";
    error.className = "error active";
    // Prevent the form from sending by //canceling the event
    event.preventDefault();
  }
}, false);
