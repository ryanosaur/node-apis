var fs = require("fs"),
    http = require("http"),
    request = require('request'),
    url = require('url'),
    exec = require("child_process").exec;


// exec("df -h", function(err, stdout, stderr) {
//   console.log(err, stdout, stderr);
// });

http.createServer(responseHandler).listen(8888);

function responseHandler(req, res) {
  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  // exec("vm_stat", function(err, stdout, stderr) {
  //   res.end(stdout.match(/free:\s+(\d+)\./)[1]);
  // });

  if (req.url === "/") {
    // server index.html
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utf8', function (err,data) {
      res.end(data);
    });
  } else {
    res.writeHead(200, {"Content-Type": "text/plain"});
    request('http://points.agilelabs.com'+req.url+'.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.end(body);
      }
    });
  }
}
