var http = require('http');
var url = require('url');
var fs = require('fs');
var aws = require('aws-lib');

var accessKey = "AKIAICJVVKTXCDI5BXHA";
var accessSecretKey = "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";
var associateId = "tartanhacks-20";
var prodAdv = aws.createProdAdvClient(accessKey, accessSecretKey, associateId);
var options = {SearchIndex: "Fashion", Keywords: "Coats", ResponseGroup: "Images,ItemAttributes,Offers", ItemPage: 10};

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
    //console.log(res);
    res.end(JSON.stringify(amazonRes));
  });
}

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);

  console.log(url_parts);

  if (url_parts.pathname.startsWith("/data")) sendData(res);
  else sendFile(res, url_parts.pathname);
  
});

server.listen(process.env.PORT || 8080, function(err) {
  if (process.env.PORT) 
    console.log("Server listening on port".concat(process.env.PORT.toString()));
  else
    console.log("Server listening on port 8080");
})