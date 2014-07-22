var express = require('express')
  , http = require('http')
  , bodyParser = require('body-parser')
  , DataStore = require('nedb')
  , app = express()
  , http_port = null
  , humansDb = new DataStore({ filename: 'humansDb.nedb' })
  , args = process.argv.splice(2)
  , mode = args[0] || 'dev'
  , static_path = mode == 'dev' ? '/try' : mode == 'prod' ? '/public' : '/';

app.use(express.static(__dirname + static_path));
app.use(bodyParser());

function ouch() {
  new Error("bad parameter");
}

// get all humans
app.get("/humans", function(req, res) {
  humansDb.find({}, function (err, docs) {
    res.send(docs);
  });

});

// get a human by id
app.get("/humans/:id", function(req, res) {
  humansDb.findOne({ _id: req.params.id }, function (err, doc) {
    res.send(doc)
  });
});

// delete human by id
app.delete("/humans/:id", function(req, res) {
  humansDb.remove({ _id: req.params.id }, {}, function (err, numRemoved) {
    res.statusCode = 200;
    res.send({res:numRemoved});
  });
});

// add a human
app.post("/humans", function(req, res) {
  var human = req.body;
  humansDb.insert(human, function (err, newDoc) {
    res.statusCode = 301;
    res.header("location", "/humans/"+newDoc._id).end();
  });

});

// update a human
app.put("/humans/:id", function(req, res) {
  humansDb.update({_id:req.params.id}, req.body, {}, function (err, numReplaced) {
    res.statusCode = 200;
    res.send({res:numReplaced});
  })
});

// run app when database loaded
humansDb.loadDatabase(function (err) {
  http_port = args[1] || process.env.PORT || 3000;
  app.listen(http_port);
  console.log("Listening on:", http_port, "Static path:", static_path);
});
