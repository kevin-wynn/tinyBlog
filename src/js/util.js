/**
 * TinyBlog custom functionality
 *
 * @type {Object}
 */

var TB = {
  util = {
    /**
     * Basic get function to get an element by id
     *
     * @param  {string} id the id string to look for
     * @return {el}        the element found
     */
    getById: (id) => {
      return document.getElementById(id);
    },

    /**
     * Returns an array of elements by className
     * @param  {string} cls the className to get elements by
     * @return {array}      the array of elements with that className
     */
    getByClass: (cls) => {
      return document.getElementsByClassName(cls);
    },

    /**
     * Traverses an elements attributes for its id value to return
     * @param  {string} el the element to traverse
     * @return {id}        the value of the id of the element
     */
    getElementsIdValue: (el) => {
      return el.attributes.id.value;
    },

    /**
     * Change a button's text
     *
     * @param {string} el      the element to change
     * @param {string} newText the new text to update to
     */
    changeButtonText: (el, newText) => {
      el.innerHTML=newText;
    },

    /**
     * Change a button's text and background color
     *
     * @param {string} el      the element to change
     * @param {string} newText the new text to update to
     * @param {string} color   the hex value background color to change to
     */
    changeButtonTextAndColor: (el, newText, color) => {
      el.innerHTML=newText;
      el.style.backgroundColor=color;
    },

    /**
     * Shows an element from button click
     *
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
     *
     * @param {string} el the element to hide
     */
    hideByButton: (el) => {
      for(var i=0; el.classList.length > i; i++) {
        var className = el.classList[i];
        if(className != 'hidden') {
          el.classList.add('hidden');
        }
      }
    },

    /**
     * toggles a state of hidden on an object - removes or adds the hidden class
     * @param  {string} el the element to toggle class on
     */
    toggleVisibility: (el) => {
      el.classList.toggle('hidden');
    },

    /**
     * turn a form into a json object
     *
     * @param  {array}  formArray the form elements in an array
     * @return {returnObj}        the object to return
     */
    objectifyForm: (formArray) => {
      var returnObj = {};
      var date;
      for (var i = 0; i < formArray.length; i++){
        returnObj[formArray[i].name] = formArray[i].value;
      }
      return returnObj;
    }
  },

  request = {

    /**
     * Request promise to make an XHR request with .then() and .catch() for response
     * and error calls
     *
     * @param  {string} type    the type of request, post or get
     * @param  {string} url     the url to make the request to
     * @param  {object} params  the object params for a post or get
     * @return {Promise}        the promise resolve or reject
     */
    request: (type, url, params) => {
      return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        if(type == 'POST') {
          xhr.send(JSON.stringify(params));
        } else if (type == 'PUT') {
          xhr.send(JSON.stringify(params))
        } else if (type == 'GET') {
          xhr.send();
        }
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4){
            if (xhr.status === 200){
              var resp = xhr.responseText;
              var respJson = JSON.parse(resp);
              resolve(respJson);
            } else {
              reject(xhr.status);
            }
          }
        }
      });
    },

    /**
     * Shows a success message on a given element by changing its innerHTML
     *
     * @param  {string} el              the element to show the message on
     * @param  {string} successMessage  the success message to show
     */
    showSuccessMessageOnEl: (el, successMessage) => {
      if(el.classList.contains('hidden')) {
        TB.util.toggleVisibility(el);
        el.innerHTML = successMessage;
      }
    }
  },

  admin = {

  },

  ui = {

  }

}
