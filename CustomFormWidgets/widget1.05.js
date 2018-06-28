window.onload = function()  {
// ------- //
// HELPERS //
// ------- //

NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
};

// -------------------- //
// Function definitions //
// -------------------- //

function deactivateSelect(select) {
  if (!select.classList.contains('active')) return;

  var optList = select.querySelector('.optList');

  optList.classList.add('hidden');
  select.classList.remove('active');
}

function activeSelect(select, selectList) {
  if (select.classList.contains('active')) return;

  selectList.forEach(deactivateSelect);
  select.classList.add('active');
}

function toggleOptList(select, show) {
  var optList = select.querySelector('.optList');

  optList.classList.toggle('hidden');
}

function highlightOption(select, option) {
  var optionList = select.querySelectorAll('.option');

  optionList.forEach(function (other) {
    other.classList.remove('highlight');
  });

  option.classList.add('highlight');
}

// ------------- //
// Event binding //
// ------------- //

window.addEventListener("load", function () {
  var form = document.querySelector('form');

  form.classList.remove("no-widget");
  form.classList.add("widget");
});

window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  selectList.forEach(function (select) {
    var optionList = select.querySelectorAll('.option');

    optionList.forEach(function (option) {
      option.addEventListener('mouseover', function () {
        highlightOption(select, option);
      });
    });

    select.addEventListener('click', function (event) {
      toggleOptList(select);
    }, false);

    select.addEventListener('focus', function (event) {
      activeSelect(select, selectList);
    });

    select.addEventListener('blur', function (event) {
      deactivateSelect(select);
    });
  });
});

/* Update the value according to user input */

// update displayed value and synch with native widget
// Two parameters
// select : the DOM node with the class `select` containg the value to update
// index : the index of the value selected
function updateValue(select, index) {
  // get the native widget for the custom widget
  // In this ex. the native widget is a sibling of the custom widget
  var nativeWidget = select.previousElementSibling;

  // get value of placeholder of the cust. widget
  var value = select.querySelector('value');

  // get the whole list of options
  var optionList = select.querySelectorAll('.option');

  // set the selected index of the choice made
  nativeWidget.selectIndex = index;

  // update the value of the placeholder
  value.innerHTML = optionList[index].innerHTML;

  // highlight the corresponding option of our custom widget
  highlightOption(select, optionList[index]);
}

// This function returns the current selected index in the native widget
// One parameter:
// select : the DOM node with the `select` class related to the native widget
function getIndex(select) {
  var nativeWidget = select.previousElementSibling;

  return nativeWidget.selectedIndex;
}

/* Functions used to bind the native widget to the custom widget */

// handle event binding when the document is loaded
window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  // initialize each custom widget
  selectList.forEach(function (select) {
    var optionList = select.querySelectorAll('.option'),
      selectedIndex = getIndex(select);

    // make custom widget focusable
    select.tabIndex = 0;

    // no longer focusable
    select.previousElementSibling.tabIndex = -1;

    // make sure default selected value is displayed
    updateValue(select, selectedIndex);

    // each click on a option updates the value
    optionList.forEach(function (option, index) {
      option.addEventListener('click', function (event) {
        updateValue(select, index);
      });
    });

    // When keyboard is used on a focused widget, update the value
    select.addEventListener('keyup', function (event) {
      var length = optionList.length,
        index = getIndex(select);

      // when down arrow is hit, jump to the lower option
      if (event.keyCode === 40 && index < length - 1) { index++; }

      // When up arrow is hit, jump to the option above
      if (event.keyCode === 38 && index > 0) { index--; }

      updateValue(select, index);
    });
  });
});
}
// TODO: added js to window.onload = function(){}
// now the native widget appears, and is working,
// but my custom widget doesn't display
