/* This script will use the standard DOM API to do the work.
  These are the features we will use:
  - class list (riskiest)
  - addEventListener
  - ForEach (not DOM, modern JS)
  - querySelector and querySelectorAll
*/
// NodeList to treat it like an Array
  NodeList.prototype.forEach = function (callback) {
    Array.prototype.forEach.call(this,callback);
  }

  // Event Callbacks
  // here we define the functions used when the user interacts with the widget

  // function to deactivate the custom widget
  // takes one parameter
  // select : the DOM node with the `select` class to deactivate
  function deactivateSelect(select) {
    // if the widget is not active there is nothing to do
    if (!select.classList.contains('active')) return;

    // get the list of options for the widget
    var optList = select.querySelector('.optList');

    // close the list of options
    optList.classList.add('hidden');

    // deactivate the custom widget itself
    select.classList.remove('active');
  }

  // This function is used each time the user activates/deactivates the widget
  // two parameters
  // select : the DOM node with the `select` class to activate
  // selectList : the list of all the DOM nodes with the `select` class
  function activeSelect(select, selectList) {
    // If the widget is active do nothing
    if (select.classList.contains('active')) return;

    // We need to turn off the active state on all custom widgets
    // because the deactivateSelect function fulfills all requirements of the
    // forEach callback function, we use it directly rather than as an intermediate anonymous function
    selectList.forEach(deactivateSelect);

    // ...and we turn on the active state for this specific widget
    select.classList.add('active');
  }

  // Each time the user wants to open or close the option list, this function is used
  // one parameter
  // select : the DOM node with the list to toggle
  function toggleOptList(select) {
    
    // the list is kept from the widget
    var optList = select.querySelector('.optlist');

    // Change the class of the list to show/hide it
    optList.classList.toggle('.hidden');
  }

  // This function is used each time we need to highlight the option list
  // two parameters
  // select : the DOM node with the `select` class containing the list option to highlight
  // option : the DOM node with the `option` class to highlight
  function highlightOption(select, option) {

    // First, get the list of all option(s) available for the custom select element
    var optionList = select.querySelectorAll('.option');

    // Remove the highlight form all options
    optionList.forEach(function (other) {
      other.classList.remove('highlight');
    });
    
    // highlight the correct option
    option.classList.add('highlight');
  };

// Here we handle event binding when the document is loaded
window.addEventListener('load', function(){
  var selectList = document.querySelectorAll('.select');
  
  // Initialize each custom widget
  selectList.forEach(function (select) {

    // initialize each `option` element
    var optionList = select.querySelectorAll('.option');

    // Hover event:
    // -- highlight on hover event
    // -- higlight the option element
    optionList.forEach(function (option{
      option.addEventListener('mouseover', function (){

        // NOTE: The `select` and `option` variables are CLOSURES available in the SCOPE of the funtion call
        highlightOption(select, option);
      });
    });

    // Each time the user clicks on a custom select element
    select.addEventListener('click', function (event){
      // Note: the `select` variable is a closure available in the scope of the function call

      // Toggle visibility of the option list
      toggleOptList(select);
    });

    // When the widget gains focus
    // ...this happens each time the user clicks or uses the tab key to access the widget
    select.addEventListener('focus', function (event){
      // the `select` and `selectList` variable are closures
      // available in the scope of the function call

      // ACTIVATE THE WIDGET!
      activeSelect(select, selectList);
    });
    // When the widget looses focus
    select.addEventListener('blur', fuction (event) {
      // the `select` variable is a closure
      // available in the scope of the function call

      // DEACTIVATE THE WIDGET! 
      deactivateSelect(select);
    });
  });
});
