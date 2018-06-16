var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var mysql = require('mysql');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var app = express();
// app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.get('/favicon.ico', (req, res) => res.status(204));

/* app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'blog',
    port: 3306
  });
  res.locals.connection.connect();
  next();
}); */

app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port: 3306
  });
  res.locals.connection.connect();

  res.locals.connection.query('CREATE DATABASE IF NOT EXISTS b03703023_blog', function (err) {
    if (err) throw err;
    res.locals.connection.query('USE b03703023_blog', function (err) {
        if (err) throw err;
        res.locals.connection.query(
          'CREATE TABLE IF NOT EXISTS `users` ('
          +'  `id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,'
          +'  `username` varchar(255) NOT NULL,'
          +'  `role` enum(\'author\',\'admin\') DEFAULT NULL,'
          +'  `password` varchar(255) NOT NULL,'
          +'  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,'
          +'  `updated_at` timestamp NULL DEFAULT NULL'
          +') ENGINE=InnoDB DEFAULT CHARSET=latin1;'
                , function (err) {
                if (err) throw err;
            });
        res.locals.connection.query('CREATE TABLE IF NOT EXISTS `posts`('
        +'  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        +'   `user_id` int(11) DEFAULT NULL,'
        +'   `title` varchar(255) NOT NULL,'
        +'   `views` int(11) NOT NULL DEFAULT \'0\','
        +'   `image` varchar(255) NOT NULL,'
        +'   `body` text NOT NULL,'
        +'   `published` tinyint(1) NOT NULL,'
        +'   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        +'   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        +'   FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION'
        +' ) ENGINE=InnoDB DEFAULT CHARSET=latin1', function (err) {
              if (err) throw err;
          });
  /* 
        res.locals.connection.query( 'INSERT IGNORE INTO `users` ( `username`,`role`, `password`, `created_at`, `updated_at`) VALUES'
        +'(\'Randy\',  \'admin\', \'qwer\', \'2018-06-14 12:52:58\', \'2018-06-14 12:52:58\');', function (err) {
          if (err) throw err;
        });
  
        res.locals.connection.query('INSERT IGNORE INTO `posts` ( `user_id`, `title`, `views`, `image`, `body`, `published`, `created_at`, `updated_at`) VALUES'
        +'( 1, \'Patch 7.5 - Revisiting Aatrox\', 0, \'none\', \'Aatrox is one of our top candidates for whenever we tackle divers in a class update, thanks to some pretty fundamental game health problems. Knowing that, we’ve been holding off on balance tweaks on the Darkin Blade until we’d had a chance to solve some of those issues. To be frank, he’s been left in that state for far longer than we’d intended, and we should have tried a minor pass on his problems long ago. In Patch 7.5, we decided to roll up our sleeves and do what we could to make Aatrox more safely tuneable.\n\n\nWhen Aatrox is ahead, he feels like a god of war, dishing out tons of damage and healing through anything short of a full team’s worth of focused punishment. Blood Thirst’s healing gets stronger as Aatrox loses health, meaning getting him low just makes him harder to kill. Even if you do burst through his lifesteal, you have to kill him a second time thanks to Blood Well’s revive effect.\n\nBut when he’s behind? To access the strength of Blood Well, Aatrox has to bleed his own health through his abilities, which might just get him killed. And if (when) he does die, he’s even weaker until his passive resurrection returns.\n\n\', 1, \'2018-06-14 19:58:02\', \'2018-06-14 19:58:31\');'
  
      ); */
    });
  });

  next();
});



app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.all('*',function (req, res, next) {  
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Credentials', true); 
   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');  
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); 
    if (req.method == 'OPTIONS') {    
      res.sendStatus(204); 
    } else {
      next();
    }
    
  });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var http = require('http');
module.exports = app;



var server = http.createServer(app);
server.listen(5566);
