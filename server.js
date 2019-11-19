var express = require('express');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();

app.use('/', express.static('.'));
app.use(bodyParser.json());

var url = "mongodb://localhost:27017";

app.get('/fans_appeal', function (req, res) {
  mongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }

    var dbo = db.db("web_project");
    var result = dbo.collection("fans_appeal").find().toArray().then(function (data) {
      res.send(data);
    });
    db.close();
  });
});

app.post('/fans_appeal', function (req, res) {
  mongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }

    if (req.body.length != 0) {
      var dbo = db.db("web_project");
      dbo.collection("fans_appeal").insert(req.body, function(err, res) {
        if (err) throw err;
        db.close();
      });
    }
  });
  res.send();
});

app.get('/news', function (req, res) {
  mongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }

    var dbo = db.db("web_project");
    var result = dbo.collection("news").find().toArray().then(function (data) {
      res.send(data);
    });
    db.close();
  });
});

app.post('/news', function (req, res) {
  mongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }

    if (req.body.length != 0) {
      var dbo = db.db("web_project");
      dbo.collection("news").insert(req.body, function(err, res) {
        if (err) throw err;
        db.close();
      });
    }
  });
  res.send();
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
