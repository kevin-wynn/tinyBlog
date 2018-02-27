document.addEventListener('DOMContentLoaded', () => {

  var newPostButton = TB.util.getById('newPostButton');
  var newPostForm = TB.util.getById('newPostForm');
  var savePostButton = TB.util.getById('savePostButton');
  var newPostSuccess = TB.util.getById('newPostSuccess');

  if(newPostButton) {
    newPostButton.addEventListener('click', () => {
      if(!newPostForm.classList.contains('hidden')) {
        TB.util.changeButtonTextAndColor(newPostButton, 'Add New Post', '#3498DB');
      } else {
        TB.util.changeButtonTextAndColor(newPostButton, 'Cancel Adding Post', '#E87E04');
      }

      TB.util.toggleVisibility(newPostForm);
    });
  }

  if(savePostButton) {
    savePostButton.addEventListener('click', () => {
      const formData = TB.util.objectifyForm(newPostForm);
      const req = new Request('/admin/posts/createPost', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      fetch(req)
        .then(resp => {
          if (resp.status === 200) {
            TB.request.success(newPostSuccess, 'Post Saved');
          } else {
            throw new Error('Something went wrong on api server!');
          }
        })
        .then(resp => {
          console.debug(resp);
        }).catch(err => {
          console.error(err);
        });
    })
  }

});
