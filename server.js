var http = require('http');
var url = require('url');
var fs = require('fs');
var aws = require('aws-lib');

var accessKey = "AKIAICJVVKTXCDI5BXHA";
var accessSecretKey = "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";
var associateId = "tartanhacks-20";
var prodAdv = aws.createProdAdvClient(accessKey, accessSecretKey, associateId);
<<<<<<< HEAD
var options = {SearchIndex: "Fashion", Keywords: "Coats", ResponseGroup: "Images,ItemAttributes,Offers"};
=======
var options = {SearchIndex: "Fashion", Keywords: "Coats", ResponseGroup: "Images,ItemAttributes,Offers", ItemPage: 10};
>>>>>>> master

// sends file back to client
function sendFile(res, url) {
  if (url === '/') {
    fs.readFile('index.html', function(err, data) {
      res.end(data);
    });
  } else {
    fs.readFile(url.substr(1), function(err, data) {
      res.end(data);
    });
  }
}

function sendData(res) {
  prodAdv.call("ItemSearch", options, function (err, amazonRes){
<<<<<<< HEAD
=======
    //console.log(res);
>>>>>>> master
    res.end(JSON.stringify(amazonRes));
  });
}

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);

<<<<<<< HEAD
  if (url_parts.pathname.startsWith("/data")) {
    var extra = url_parts.query
    if (extra === "") {
      sendData(res);
    }
    else {
      var params = extra.split("&");
      for (var i = 0; i < params.length; i++) {
        var split = params[i].split("=");
        key = split[0];
        val = split[1];
        if (["SearchIndex", "Keywords", "ResponseGroup", "ItemPage"].indexOf(key) != -1) {
          options[key] = val;
        }
      }
      sendData(res);
    }
  }
=======
  console.log(url_parts);

  if (url_parts.pathname.startsWith("/data")) sendData(res);
>>>>>>> master
  else sendFile(res, url_parts.pathname);
  
});

server.listen(process.env.PORT || 8080, function(err) {
  if (process.env.PORT) 
    console.log("Server listening on port".concat(process.env.PORT.toString()));
  else
    console.log("Server listening on port 8080");
})