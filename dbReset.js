var updates = require('update-mongo')({
  db: 'tinyBlog'
});

updates.run([
  './dbScripts/users',
  './dbScripts/posts'
], () => {
  console.log('Done running update scripts');
});
