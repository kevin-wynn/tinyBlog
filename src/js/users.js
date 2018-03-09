document.addEventListener('DOMContentLoaded', () => {
  var newUserform = TB.util.getById('newUserForm');
  var saveUserButton = TB.util.getById('saveUserButton');

  /**
   * Interaction for new users button - this handler binds to a new user button if available
   * and listens for a 'click' function. Once clicked the form will expand and show itself
   * and apply a listener to the save user button
   */
  if(saveUserButton) {
    saveUserButton.addEventListener('click', () => {
      const formData = TB.util.objectifyForm(newUserForm);
      // new users will always be active
      formData.active = true;
      TB.request.request('POST', '/admin/user/createUser', formData)
      .then((resp) => {
        // TODO: Success message and close form, refresh users list
        console.log('response from creating user, probably want to put a success message somewhere');
      }).catch((err) => {
        // TODO: Error messaging - need form validation
        console.log('error:', err);
      });
    })
  }

  var editUserForm = TB.util.getById('editUserForm');
  var saveEditUserButton = TB.util.getById('saveEditUserButton');

  if(saveEditUserButton) {
    saveEditUserButton.addEventListener('click', () => {
      const formData = TB.util.objectifyForm(editUserForm);
      console.log(formData);
      TB.request.request('PUT', '/admin/user/updateUser', formData)
      .then((resp) => {
        // TODO: Success message and close form, take user back to users page
        console.log(resp);
      }).catch((err) => {
        // TODO: Error messaging - need form validation
        console.log('error:', err);;
      })
    })
  }

});
