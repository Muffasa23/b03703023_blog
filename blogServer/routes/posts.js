var express = require('express');
var router = express.Router();

/* String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
}; */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query('USE b03703023_blog', function (err) {
    if (err) throw err;
    res.locals.connection.query('SELECT * from posts', function (error, results, fields) {
    if(error) throw error;
    //console.log(JSON.stringify(results).escapeSpecialChars());
    res.send(JSON.stringify(results));
  });
  });
});

router.post('/', function(req, res) {
  var data = req.body;
  const post = (({ title, body,image,published, created_at, updated_at }) => ({ title, body,image,published,created_at, updated_at }))(data);
  //console.log('new User: ',user.username)

  if(data.purpose === 'addPost'){
    res.locals.connection.query('USE b03703023_blog', function (err) {
      if (err) throw err;
      res.locals.connection.query('INSERT INTO posts SET ? ',post, function(err, result) {
        if(err){
          console.log('error: ',err)
        }
      });
    });
  }

  else if(data.purpose === 'showPost'){
    res.locals.connection.query('USE b03703023_blog', function (err) {
      if (err) throw err;
      res.locals.connection.query('SELECT * FROM posts WHERE title = ? ', [data.title], function(err,result){
        if(err){
          console.log('error: ',err)
        }
        
        if(result.length === 0){
          res.send(JSON.stringify('notFound'))
        }
        else{
          res.send(result)
        }
      });
    });
  }
  
  
});


module.exports = router;
