var express = require('express');
var router = express.Router();

String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query('USE b03703023_blog', function (err) {
    if (err) throw err;
    res.locals.connection.query('SELECT * from posts', function (error, results, fields) {
    if(error) throw error;
    console.log(JSON.stringify(results).escapeSpecialChars());
    res.send(JSON.stringify(results));
  });
  });
});


module.exports = router;
