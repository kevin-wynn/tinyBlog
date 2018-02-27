/**
 * TinyBlog custom functionality
 * @type {Object}
 */

var TB = {
  util = {
    /**
     * Basic get function to get an element by id
     * @param  {string} id the id string to look for
     * @return {el} the element found
     */
    getById: (id) => {
      return document.getElementById(id);
    },

    /**
     * Change a button's text
     * @param  {string} el the element to change
     * @param  {string} newText the new text to update to
     */
    changeButtonText: (el, newText) => {
      el.innerHTML=newText;
    },

    /**
     * Change a button's text and background color
     * @param  {string} el the element to change
     * @param  {string} newText the new text to update to
     * @param  {string} color the hex value background color to change to
     */
    changeButtonTextAndColor = (el, newText, color) => {
      el.innerHTML=newText;
      el.style.backgroundColor=color;
    },

    /**
     * Shows an element from button click
     * @param  {string} el the element to show
     */
    showByButton: (el) => {
      for(var i=0; el.classList.length > i; i++) {
        var className = el.classList[i];
        if(className == 'hidden') {
          el.classList.remove('hidden');
        }
      }
    },

    /**
     * Hides an element on button click
     * @param  {string} el the element to hide
     */
    hideByButton: (el) => {
      for(var i=0; el.classList.length > i; i++) {
        var className = el.classList[i];
        if(className != 'hidden') {
          el.classList.add('hidden');
        }
      }
    },

    toggleVisibility: (el) => {
      el.classList.toggle('hidden');
    },

    objectifyForm: (formArray) => {
      var returnArray = {};
      for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
      }
      return returnArray;
    }
  },

  request = {

    /**
     * [success description]
     * @param  {[type]} el             [description]
     * @param  {[type]} successMessage [description]
     * @return {[type]}                [description]
     */
    success: (el, successMessage) => {
      if(el.classList.contains('hidden')) {
        TB.util.toggleVisibility(el);
        el.innerHTML = successMessage;
      }
    }
  },

  admin = {

    

  }
}
