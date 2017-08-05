var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('blogapp', ['blogapp']);
var bodyParser = require('body-parser');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "students"
});

var session  = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var passport = require('passport');
var flash    = require('connect-flash');
var nodemailer = require('nodemailer');
// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration
 // pass passport for configuration




con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(__dirname + '/public_html'));
app.use(bodyParser.json());

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport




app.get('/students', function (req, res) {
  console.log('I received a GET request');
  con.query("SELECT * FROM student",function(err, result, fields){
    if(err) throw err;
    console.log(result);
    res.json(result);
  });

  /*db.blogapp.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });*/
});

app.post('/students', function (req, res) {
  console.log('request body',req);
  var data = req.body;
  var data1 = data[0];
  console.log('data ------>',data);
  con.query('INSERT INTO student SET ?',data, function(err,result){
if(err) throw err;
console.log('data inserted');
res.json(data);
  });


  /*db.blogapp.insert(req.body, function(err, doc) {
    res.json(doc);
  });*/
});

app.delete('/students/:id', function (req, res) {
  var id = req.params.id;
  console.log('id ------>',id);
  con.query('DELETE FROM student WHERE id = ?',id,function(err,result){
  if(err) throw err;
console.log('deleted data',result);
res.json(result);
  });
  /*db.blogapp.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });*/
});

app.get('/students/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  con.query('SELECT * FROM student WHERE id = ?',id,function(err,rows){
  if(err) throw err;
  console.log('edited data------>>',rows);
  var row = rows[0];
  var dat = JSON.stringify(row);
  res.json(row);
  
  console.log('result -------->>',dat);

  });
  /*db.blogapp.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });*/
});

app.put('/students/:id', function (req, res) {
  var id = req.params.id;
  var data = req.body;
  console.log(req.body.name);
  con.query('UPDATE student SET ? WHERE id = ?', [data, id], function(err,result){
  if(err) throw err;
console.log('data updated');
res.json(data);
  });
  /*db.blogapp.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {bname: req.body.bname, articleno: req.body.articleno, article: req.body.article}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );*/
});




app.listen(8383);
console.log("Server running on port 8383");