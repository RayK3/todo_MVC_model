const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var projects = [];
var todos = [];

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
express.json();

app.get('/projects', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(projects));
});

app.get('/todos', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(todos));
})

app.post('/create', function(req, res) {
  var receivedProjects = req.body.projects;
  var receivedTodos = req.body.todos;
  receivedProjects = JSON.parse(receivedProjects);
  receivedTodos = JSON.parse(receivedTodos);

  projects = receivedProjects;
  todos = receivedTodos;
  res.writeHead(200);
  res.end();
});


let handleError = (err, res) => {
  res.writeHead(404);
  res.end();
}

let server = http.createServer(function(req, res) {
  let fileName = req.url.length > 1? req.url.substring(1) : 'index.html';
  fs.readFile(
    path.resolve(__dirname, 'app', fileName),
    function(err, content) {
      if(err) {
        handleError(err, res);
      } else {
        res.end(content);
      }
    }
  );
})

server.listen(8000);
app.listen(8001, function() {
  console.log('Express server running');
})
