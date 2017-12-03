var express = require('express')
, bodyParser = require('body-parser')
, http = require('http')
, util = require('util')
, Promise = require('promise')
//, Database = require('./js/database.js')
, path = require('path');

var app = express();
var htmlData = [];

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/img',express.static(path.join(__dirname, '/public/images')));
app.use('/css',express.static(path.join(__dirname, '/public/css')));
app.use('/js',express.static(path.join(__dirname, '/public/js')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/main.html');
});

app.route('/main')
  .get(function (req, res) {
    //console.log('getMethod '+htmlData[0]);
    res.sendFile(__dirname + '/main.html');
  })
  .post(function (req, res) {
    console.log(req.body.html);
    let bodyHtml = req.body.html;
    if(undefined != bodyHtml
      && null != bodyHtml
      && '' != bodyHtml)
        htmlData.push(bodyHtml);


    //console.log(htmlData);
    //res.sendFile(__dirname + '/main.html');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('http://localhost:3000/');
    res.end();
  });

  app.get('/getHtmlData', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(htmlData));
    res.end();
  });

app.get('/getUserName', function (req, res) {
  let userName = process.env['USERPROFILE'].split(path.sep)[2];
  //let loginId = path.join("domainName",userName);
  //console.log(loginId);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(userName);
  res.end();
});

app.listen(3000, function () {
  console.log('App listening on port 3000!')
});
