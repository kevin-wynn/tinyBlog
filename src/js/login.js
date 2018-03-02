document.addEventListener('DOMContentLoaded', () => {

  var loginButton = TB.util.getById('loginButton');
  var loginForm = TB.util.getById('loginForm');

  if(loginButton) {
    loginButton.addEventListener('click', () => {
      const formData = TB.util.objectifyForm(loginForm);
      TB.request.request('POST', '/login/userLogin', formData)
      .then((resp) => {
        if(resp.success) window.location = '../admin';
      }).catch((err) => {
        console.log('error:', err);
      });
    })
  }

});
