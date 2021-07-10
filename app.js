var express = require('express');
var path = require('path')
var app = express();
var fs = require('fs')
var morgan = require('morgan');
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }

  app.use(bodyParser.json({ verify: rawBodySaver }));
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
  app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));
  
  // create application/json parser
  var jsonParser = bodyParser.json();
  // create application/x-www-form-urlencoded parser
  var urlencodedParser = bodyParser.urlencoded({ type: 'application/*+json', extended: true });

  // Configure morgan module to log all requests.
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname,'login.html'));
});

app.post('/login', function (req, res) {
    let username = "kundan@example.com";
    let password = "kundan123";
    
    let inputusername = req.body.username;
    let inputpassword = req.body.password;
    console.log(req.body)
    
    if((inputusername==username)&&(inputpassword==password)){
    res.json({status:'success','message':'Logged in'});
    }
    else {
    res.json({status:'failed','message':'username or password is incorrect'});
    }
});
app.get('/getposts', function (req, res) {
    const data = fs.readFileSync('./database.json',{encoding:'utf8', flag:'r'});
    res.send(data);
});

app.listen(3000);