//////// optlist may not be correct, neeed to convert this in all files

/** This code uses the DOM API to do all the work *needed
* Features in order from riskiest to safest:
* 1. classList
* 2. addEventListener
* 3. forEach (not DOM but modern js)
* 4. querySelector and querySelectorAll
* One note about using querySelectorAll:
* the object returned from the function is a 
* NodeList rather than an Array.
* Array objects support forEach, but NodeList doesn't.
*
*
* We will create a script to add forEach support to NodeList.
*/
NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

/** Building event callbacks:
* These define the functions that will be used whenever a user interacts with the widget.
*/

// This functiom is used each time WE want to deactivate the custom widget
// We pass it the select parameter
// This references the DOM node with the 'select' class
function deactivateSelect(select) {

  // When the widget is innactive, there is nothing to change
  if (!select.classList.contains("active")) return;

  // Get the list of options for the custom widget
  var optList = select.quertSelector('.optlist');

  // Close the list of options...
  optlist.classList.add('hidden');

  // ... and deactivate the custom widget
  select.classList.remove('active');
}

// This function is used when the USER wants to activate/deactivate the custom widget
// It takes two parameters
// select : the DOM node with the 'select' class to activate
// selectList ; the list of all the DOM nodes with the 'select' class
function activeSelect(select, selectList) {

  // If the wudget is already active there is nothing to do
  if (select.classList.contains('active')) return;

  // Need to turn of active state on all custom widgets
  // The deaactvateSelect function fulfills all the reeequirements
  // of the forEach callback function 
  // This is used drectly rather than using the intermediate anonymous function
  selectList.forEach(deactivateSelect);

  // Turn on active state for this specific widget
  select.classList.add('active');

  // This function will be used whenever the user wants to open/close the list of options
  // One parameter:
  // select: the DOM node with the list to toggle
  function toggleOptList(select) {

    // The list is kept from the widget
    var optlist = select.querySelector('.optList');

    // We change the class of the list to show/hide it
    optList.classList.toggle('hidden');

    // This function will be used to highlight an option
    // Two parameters:
    // select : the DOM node with the 'select' class, which contains the option to highlight
    // option : the DOM node with the 'option' class to highlight
    function highlightOption(select, option) {
      
      // We get the list of all option available for our custom select element.
      var optionList =  select.quertSelectorAll('.option');

      // We remove hightlight from all options
      optionList.forEach(function (other) {
        other.classList.remove('highlight');
      });

      //Highlight the correct option
      option.classList.add('highlight');
    }
  }
}


//TODO _ REVIEW CODE BEFORE COMMENCING
