var express = require('express')
, bodyParser = require('body-parser')
, http = require('http')
, util = require('util')
, Promise = require('promise')
, Database = require('./public/js/database.js')
, path = require('path');

var app = express();
//var htmlData = [];

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/img',express.static(path.join(__dirname, '/public/images')));
app.use('/css',express.static(path.join(__dirname, '/public/css')));
app.use('/js',express.static(path.join(__dirname, '/public/js')));

app.use('/img1',express.static(path.join(__dirname, '/media/images')));
app.use('/css1',express.static(path.join(__dirname, '/media/css')));
app.use('/js1',express.static(path.join(__dirname, '/media/js')));

app.get('/', function (req, res) {
  /*var database = new Database();
  const query = 'delete from select_content where content_id > ?';
  var args = ['42'];
  database.query(query, args).then(() => {
    console.log('record inserted!');
  });*/
  res.sendFile(__dirname + '/content.html');
});

app.route('/content')
  .get(function (req, res) {
    //console.log('getMethod '+htmlData[0]);
    res.sendFile(__dirname + '/content.html');
  })
  .post(function (req, res) {
    //console.log(req.body.html);
    let bodyHtml = req.body.html;
    if(undefined != bodyHtml
      && null != bodyHtml
      && '' != bodyHtml) {
        //htmlData.push(bodyHtml);
        //console.log('selected content ' + bodyHtml);
        var database = new Database();
        const checkDuplicateQuery = 'select * from select_content where content=?';
        var checkDuplicateArgs = [bodyHtml];
        database.query(checkDuplicateQuery, checkDuplicateArgs).then( rows => {
          if(rows.length > 0) {
            console.log('Content already exists');
          } else {
            const query = 'insert into sys.select_content (content, user, cre_time) values(?,?,now());';
            var args = [bodyHtml, 'zktewfm'];
            database.query(query, args).then(() => {
              console.log('record inserted!');
            });
          }
        }).then(() => {
          database.close().then(() => {
            res.end();
          });
        });
      }
    //console.log(htmlData);
    //res.sendFile(__dirname + '/main.html');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('http://localhost:3000/');
    res.end();
  });

  app.get('/getHtmlData', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var database = new Database();
    const query = 'select * from select_content';
    var args = [];
    database.query(query, args).then( rows => {
      res.write(JSON.stringify(rows));
    }).then(() => {
      database.close().then(() => {
        res.end();
      });
    });
    //res.write(JSON.stringify(htmlData));
    //res.end();
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
