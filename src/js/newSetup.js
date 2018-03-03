document.addEventListener('DOMContentLoaded', () => {

  var saveNewSetupButton = TB.util.getById('saveNewSetupButton');
  var newSetupForm = TB.util.getById('newSetupForm');

  if(saveNewSetupButton) {
    saveNewSetupButton.addEventListener('click', () => {
      console.log(newSetupForm);
      const formData = TB.util.objectifyForm(newSetupForm);
      console.log(formData);
      TB.request.request('POST', '/newSetup', formData)
      .then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log('error:', err);
      });
    })
  }

});
