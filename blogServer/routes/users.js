var express = require('express');
var router = express.Router();
/* var mysql = require('mysql');
var dbConfig = require('../db/config');
var userSQL = require('../db/user');


var connection = mysql.createConnection(config.mysql); */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.connection.query('USE b03703023_blog', function (err) {
    if (err) throw err;
    res.locals.connection.query('SELECT * from users', function (error, results, fields) {
   if(error) throw error;
   console.log(JSON.stringify(results));
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
        console.log(result)
        if(result.length === 0){
          res.send(JSON.stringify('login fail'))
        }
        else{
          res.send(JSON.stringify('login success'))
        }
      });
    });
  }
  
  
});


module.exports = router;


/*'If NOT EXISTS(SELECT username, password from users where username = @user.username AND password = @user.password) BEGIN INSERT INTO users SET ? '*/





/* router.get('/getUserInfo', function(req, res, next){
  // 获取前台页面传过来的参数  
  // console.log("cookies",req.cookies.user,req.cookies['user'],req.cookies)
  var user = {
      id:req.cookies.user._id,
      username:req.cookies.user.username,
  }
  // 建立连接 增加一个用户信息 
  connection.query(userSQL.findUser, [user.id], function(err, result) {
      if(result) {  
          responseClient(res, 200, 1, '添加成功',result)
      } else {
          responseClient(res, 400, 2, '添加失败')
      }
      });
}); */