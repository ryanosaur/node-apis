var fs = require("fs"),
    http = require("http"),
    request = require('request'),
    url = require('url'),
    md5 = require('MD5'),
    exec = require("child_process").exec;

http.createServer(responseHandler).listen(8888);

function responseHandler(req, res) {
  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  var choice = req.url.match(/\/[A-z]+\//);
  if(choice){
    choice = choice[0];
  }

  if(choice === '/gravatarUrl/'){
    var email = req.url.replace(/(\/[A-z]+\/)([^\s]+)$/, '$2');
    res.end("http://www.gravatar.com/avatar/" + md5(email));
  }
  else if(choice === '/Calc/'){
    var operation = req.url.replace(/(\/[A-z]+\/)([^\s]+)$/, '$2');
    var elements = operation.match(/([\d]+)([\D])([\d]+)/);
    var operator = {
      '+': function(a, b){return a + b},
      '-': function(a, b){return a - b},
      '*': function(a, b){return a * b},
      '/': function(a, b){return a / b}
    }
    res.end(elements[0] + '=' + operator[elements[2]](parseInt(elements[1]), parseInt(elements[3])));
  }
  else if(choice === '/Counts/'){
    var sentance = req.url.replace(/(\/[A-z]+\/)(.*)$/, '$2');
    var clean = sentance.replace(/%20/g, ' ');
    var wordsMatch = clean.match(/\w+/g) || { length: 0 };
    var numbersMatch = clean.match(/[0-9]/g) || { length: 0 };
    var spacesMatch = clean.match(/\s/g) || { length: 0 };
    res.end('words: ' + wordsMatch.length + '\nnumbers: ' + numbersMatch.length + '\nspaces: ' + spacesMatch.length);
  }
  else{
    res.end('<h1>404: this is not the page you\'re looking for O.o</h1>');
  }
}
