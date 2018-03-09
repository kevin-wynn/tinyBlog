document.addEventListener('DOMContentLoaded', () => {

  const newPostButton = TB.util.getById('newPostButton');
  const newPostForm = TB.util.getById('newPostForm');
  const savePostButton = TB.util.getById('savePostButton');
  const newPostSuccess = TB.util.getById('newPostSuccess');

  if(newPostButton) {
    newPostButton.addEventListener('click', () => {
      if(!newPostForm.classList.contains('hidden')) {
        TB.util.changeButtonTextAndColor(newPostButton, 'Add New Post', '#3498DB');
      } else {
        TB.util.changeButtonTextAndColor(newPostButton, 'Cancel Adding Post', '#D35400');
      }

      TB.util.toggleVisibility(newPostForm);
    });
  }

  if(savePostButton) {
    savePostButton.addEventListener('click', () => {
      const formData = TB.util.objectifyForm(newPostForm);
      TB.request.request('POST', '/posts/createPost', formData)
      .then((resp) => {
        // TODO: Success message and close form, refresh posts list
        console.log('resp', resp);
      }).catch((err) => {
        // TODO: Error messaging - need form validation
        console.log('err', err);
      })
    })
  }

});
