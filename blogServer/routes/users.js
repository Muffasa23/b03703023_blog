var express = require('express');
var router = express.Router();

let currentUser='';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query('USE b03703023_blog', function (err) {
    if (err) throw err;
    res.locals.connection.query('SELECT * from users', function (error, results, fields) {
   if(error) throw error;
   //console.log(JSON.stringify(results));
   res.send(JSON.stringify(results));
    });
 });
});


router.post('/', function(req, res) {
  var data = req.body;
  const user = (({ username, role, password, created_at, updated_at }) => ({ username, role, password, created_at, updated_at }))(data);
  //console.log('new User: ',user.username)

  if(data.purpose === 'addUser'){
    res.locals.connection.query('USE b03703023_blog', function (err) {
      if (err) throw err;
      res.locals.connection.query('INSERT INTO users SET ? ',user, function(err, result) {
        if(err){
          console.log('error: ',err)
        }
      });
    });
  }

  else if(data.purpose === 'login'){
    res.locals.connection.query('USE b03703023_blog', function (err) {
      if (err) throw err;
      res.locals.connection.query('SELECT * FROM users WHERE username = ? AND password= ?', [data.username, data.password], function(err,result){
        if(err){
          console.log('error: ',err)
        }
        //console.log(result)
        if(result.length === 0){
          res.send(JSON.stringify('login fail'))
        }
        else{
          currentUser=data.username
          res.send(JSON.stringify('login success'))
        }
      });
    });
  }
  
  else if(data.purpose === 'getUsername'){
    if(currentUser!==''){
      res.send(JSON.stringify(currentUser))
    }
    else{
      res.send(JSON.stringify('error'))
    }
  }
  
});


module.exports = router;



/* var mysql = require('mysql');
var dbConfig = require('../db/config');
var userSQL = require('../db/user');
var connection = mysql.createConnection(config.mysql); */