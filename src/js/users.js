document.addEventListener('DOMContentLoaded', () => {

  var newUserButton = TB.util.getById('newUserButton');
  var newUserform = TB.util.getById('newUserForm');
  var saveUserButton = TB.util.getById('saveUserButton');

  if(newUserButton) {
    newUserButton.addEventListener('click', () => {
      if(!newUserform.classList.contains('hidden')) {
        TB.util.changeButtonTextAndColor(newUserButton, 'Add New User', '#3498DB');
      } else {
        TB.util.changeButtonTextAndColor(newUserButton, 'Cancel Adding User', '#E87E04');
      }

      TB.util.toggleVisibility(newUserform);
    });

    if(saveUserButton) {
      saveUserButton.addEventListener('click', () => {
        const formData = TB.util.objectifyForm(newUserForm);
        // new users will always be active
        formData.append('active', true);
        TB.request.request('POST', '/users/createUser', formData)
        .then((resp) => {
          // TODO: Success message and close form, refresh users list
          console.log('response from creating user, probably want to put a success message somewhere');
        }).catch((err) => {
          // TODO: Error messaging - need form validation
          console.log('error:', err);
        });
      })
    }
  }

});
