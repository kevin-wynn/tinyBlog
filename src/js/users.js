document.addEventListener('DOMContentLoaded', () => {

  var newUserButton = TB.util.getById('newUserButton');
  var newUserform = TB.util.getById('newUserForm');
  var saveUserButton = TB.util.getById('saveUserButton');

  newUserButton.addEventListener('click', () => {
    if(!newUserform.classList.contains('hidden')) {
      TB.util.changeButtonTextAndColor(newUserButton, 'Add New User', '#3498DB');
    } else {
      TB.util.changeButtonTextAndColor(newUserButton, 'Cancel Adding User', '#E87E04');
    }

    TB.util.toggleVisibility(newUserform);
  });

});
