var http = require('http');
var url = require('url');
var fs = require('fs');
var aws = require('aws-lib');

var accessKey = "AKIAICJVVKTXCDI5BXHA";
var accessSecretKey = "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";
var associateId = "tartanhacks-20";
var prodAdv = aws.createProdAdvClient(accessKey, accessSecretKey, associateId);
var options = {SearchIndex: "Fashion", Keywords: "Crop Top", ResponseGroup: "Images,ItemAttributes,Offers"};

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
    res.end(JSON.stringify(amazonRes));
  });
}

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);

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
        val = split[1].split("%20").join(" ");
        if (["SearchIndex", "Keywords", "ResponseGroup", "ItemPage"].indexOf(key) != -1) {
          options[key] = val;
        }
      }

      console.log(options);
      sendData(res);
    }
  }
  else sendFile(res, url_parts.pathname);
  
});

server.listen(process.env.PORT || 8080, function(err) {
  if (process.env.PORT) 
    console.log("Server listening on port".concat(process.env.PORT.toString()));
  else
    console.log("Server listening on port 8080");
})