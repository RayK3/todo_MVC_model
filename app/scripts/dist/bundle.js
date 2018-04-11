(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Todo = require("./model/Todo");

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoRepository = require("./model/TodoRepository");

var _TodoRepository2 = _interopRequireDefault(_TodoRepository);

var _Project = require("./model/Project");

var _Project2 = _interopRequireDefault(_Project);

var _ProjectRepository = require("./model/ProjectRepository");

var _ProjectRepository2 = _interopRequireDefault(_ProjectRepository);

var _Controller = require("./controller/Controller");

var _Controller2 = _interopRequireDefault(_Controller);

var _DomRunner = require("./view/DomRunner");

var _DomRunner2 = _interopRequireDefault(_DomRunner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.todoRep = new _TodoRepository2.default();
    this.projRep = new _ProjectRepository2.default();
    this.controller = new _Controller2.default(this.todoRep, this.projRep);
    this.domRunner = new _DomRunner2.default(this.controller);
  }

  _createClass(App, [{
    key: "run",
    value: function run() {
      this.domRunner.run();
    }
  }]);

  return App;
}();

exports.default = App;

},{"./controller/Controller":2,"./model/Project":4,"./model/ProjectRepository":5,"./model/Todo":6,"./model/TodoRepository":7,"./view/DomRunner":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Todo = require("../model/Todo");

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoRepository = require("../model/TodoRepository");

var _TodoRepository2 = _interopRequireDefault(_TodoRepository);

var _Project = require("../model/Project");

var _Project2 = _interopRequireDefault(_Project);

var _ProjectRepository = require("../model/ProjectRepository");

var _ProjectRepository2 = _interopRequireDefault(_ProjectRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller(todoRep, projRep) {
    _classCallCheck(this, Controller);

    this.todoRep = todoRep;
    this.projRep = projRep;
  }

  _createClass(Controller, [{
    key: "postRequest",
    value: function postRequest() {
      var projects = this.projRep.projects;
      var todos = this.todoRep.todos;

      projects = JSON.stringify(projects);
      todos = JSON.stringify(todos);

      var xhttp = new XMLHttpRequest();
      var url = "http://localhost:8001/create";
      var params = "projects=" + projects + "&todos=" + todos;
      xhttp.open("POST", url, true);

      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhttp.onreadystatechange = function () {
        if (this.readystate == 4 && this.status == 200) {
          console.log('Sent the new objects');
        }
      };
      xhttp.send(params);
    }
  }, {
    key: "createProject",
    value: function createProject(name) {
      if (this.projRep.contains(name)) {
        console.log('This project already exists!');
      } else {
        var project = new _Project2.default(name);
        this.projRep.add(project);
        return project;
      }
    }
  }, {
    key: "createTodo",
    value: function createTodo(description, projectId) {
      if (this.todoRep.contains(description, projectId)) {
        console.log('This todo already exists!');
      } else {
        var todo = new _Todo2.default(description, projectId);
        this.todoRep.add(todo);
        return todo;
      }
    }
  }, {
    key: "deleteProject",
    value: function deleteProject(name) {
      if (!this.projRep.contains(name)) {
        return;
      } else {
        var project = this.projRep.findByName(name);
        this.todoRep.removeAllWithProjectId(project);
        this.projRep.remove(project);
      }
    }
  }, {
    key: "deleteTodo",
    value: function deleteTodo(description, projectId) {
      if (!this.todoRep.contains(description, projectId)) {
        console.log('This todo doesn\'t exist!');
      } else {
        var todo = this.todoRep.getTodo(description, projectId)[0];
        this.todoRep.remove(todo);
      }
    }
  }, {
    key: "toggleDone",
    value: function toggleDone(todo) {
      todo.done = !todo.done;
    }
  }]);

  return Controller;
}();

exports.default = Controller;

},{"../model/Project":4,"../model/ProjectRepository":5,"../model/Todo":6,"../model/TodoRepository":7}],3:[function(require,module,exports){
"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
  new _app2.default().run();
}); // runs the app

},{"./app":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _guidGen = require('./guidGen');

var _guidGen2 = _interopRequireDefault(_guidGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Project = function Project(name) {
  _classCallCheck(this, Project);

  this.name = name;
  this.guid = (0, _guidGen2.default)();
  this.created = new Date().toUTCString();
};

exports.default = Project;

},{"./guidGen":8}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Project = require("./Project");

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectRepository = function () {
  function ProjectRepository() {
    _classCallCheck(this, ProjectRepository);

    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:8001/projects";
    var self = this;

    xhttp.open("GET", url, false);

    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (!this.responseText) {
          self.projects = [];
        } else {
          var data = JSON.parse(this.responseText);
          self.projects = data;
        }
      }
    };
    xhttp.send();
  }

  _createClass(ProjectRepository, [{
    key: "add",
    value: function add(project) {
      this.projects.push(project);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return [].concat(_toConsumableArray(this.projects));
    }
  }, {
    key: "remove",
    value: function remove(project) {
      this.projects = this.projects.filter(function (proj) {
        return proj.guid !== project.guid;
      });
    }
  }, {
    key: "findByName",
    value: function findByName(name) {
      return this.projects.filter(function (proj) {
        return proj.name === name;
      })[0];
    }
  }, {
    key: "findByGuid",
    value: function findByGuid(guid) {
      return this.projects.filter(function (proj) {
        return proj.guid === guid;
      })[0];
    }
  }, {
    key: "clear",
    value: function clear() {
      this.projects = [];
    }
  }, {
    key: "contains",
    value: function contains(name) {
      return this.projects.filter(function (proj) {
        return proj.name === name;
      }).length > 0;
    }
  }]);

  return ProjectRepository;
}();

exports.default = ProjectRepository;

},{"./Project":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _guidGen = require('./guidGen');

var _guidGen2 = _interopRequireDefault(_guidGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Todo = function Todo(description, projectGuid) {
  _classCallCheck(this, Todo);

  this.description = description;
  this.project = projectGuid;
  this.created = new Date().toUTCString();
  this.guid = (0, _guidGen2.default)();
  this.done = false;
};

exports.default = Todo;

},{"./guidGen":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Todo = require("./Todo");

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoRepository = function () {
  // todos need to be created before they are added
  function TodoRepository() {
    _classCallCheck(this, TodoRepository);

    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:8001/todos";
    var self = this;

    xhttp.open("GET", url, false);

    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (!this.responseText) {
          self.todos = [];
        } else {
          var data = JSON.parse(this.responseText);
          self.todos = data;
        }
      }
    };
    xhttp.send();
  }

  _createClass(TodoRepository, [{
    key: "add",
    value: function add(todo) {
      this.todos.push(todo);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.todos.map(function (e) {
        return e;
      });
    }
  }, {
    key: "getAllWithProjectId",
    value: function getAllWithProjectId(project) {
      var id = project.guid;
      return this.todos.filter(function (td) {
        return td.project === id;
      });
    }
  }, {
    key: "remove",
    value: function remove(todo) {
      this.todos = this.todos.filter(function (td) {
        return td.guid !== todo.guid;
      });
    }
  }, {
    key: "removeAllWithProjectId",
    value: function removeAllWithProjectId(project) {
      var id = project.guid;
      this.todos = this.todos.filter(function (td) {
        return td.project !== id;
      });
    }
  }, {
    key: "getTodo",
    value: function getTodo(description, projectId) {
      return this.todos.filter(function (td) {
        return td.description === description && td.project === projectId;
      });
    }
  }, {
    key: "findByIndex",
    value: function findByIndex(index) {
      return this.todos[index];
    }
  }, {
    key: "findByGuid",
    value: function findByGuid(guid) {
      return this.todos.filter(function (td) {
        return td.guid === guid;
      })[0];
    }
  }, {
    key: "contains",
    value: function contains(description, projectId) {
      return this.getTodo(description, projectId).length > 0;
    }
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }
  }]);

  return TodoRepository;
}();

exports.default = TodoRepository;

},{"./Todo":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = guid;
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomRunner = function () {
  function DomRunner(controller) {
    _classCallCheck(this, DomRunner);

    this.controller = controller;

    var self = this; //for use in button callbacks

    this.addProjectButton = document.getElementById('addProjectButton');
    this.addProjectInput = document.getElementById('addProjectInput');

    this.addProjectButton.addEventListener('click', function () {
      return self.addProject.call(self);
    });
  }

  _createClass(DomRunner, [{
    key: 'showTodos',
    value: function showTodos() {
      var _this = this;

      var projects = this.controller.projRep.getAll();
      var container = document.getElementById('container');
      container.innerHTML = '';

      projects.forEach(function (project) {
        var todos = _this.controller.todoRep.getAllWithProjectId(project);
        var div = document.createElement("DIV");
        var title = document.createElement("H1");
        title.innerHTML = '' + project.name;

        var todoTable = document.createElement("TABLE");

        var addTodo = document.createElement("DIV");
        addTodo.setAttribute("id", 'addTodo' + project.guid);

        var addTodoButton = document.createElement("BUTTON");
        addTodoButton.setAttribute("id", 'addTodoButton' + project.guid);
        addTodoButton.innerHTML = 'Add Todo';

        var addTodoInput = document.createElement("INPUT");
        addTodoInput.setAttribute("type", "text");
        addTodoInput.setAttribute("placeholder", "description");
        addTodoInput.setAttribute("id", 'addTodoInput' + project.guid);

        var removeProjectButton = document.createElement("BUTTON");
        removeProjectButton.setAttribute("id", 'removeProjectButton' + project.guid);
        removeProjectButton.setAttribute("class", 'removeProjectButton');
        removeProjectButton.innerHTML = 'Remove Project';

        var tableHTML = '';
        tableHTML += '<tr>\n                      <th>Todo</th>\n                      <th>Done</th>\n                    </tr>';
        todos.forEach(function (todo) {
          tableHTML += '<tr>\n                        <td>' + todo.description + '</td>\n                        <td>' + (todo.done ? "yes" : "no") + '</td>\n                        <td><button id="check' + todo.guid + '" class="checkButton" data-guid="' + todo.guid + '">Check</button></td>\n                        <td><button id="remove' + todo.guid + '" class="removeButton" data-guid="' + todo.guid + '">Remove</button></td>\n                      </tr>';
        });
        todoTable.innerHTML = tableHTML;

        var self = _this;
        var checkButtons = todoTable.querySelectorAll('.checkButton');
        checkButtons.forEach(function (button) {
          button.addEventListener('click', function () {
            var todo = self.controller.todoRep.findByGuid(this.getAttribute('data-guid'));
            self.controller.toggleDone(todo);
            self.showTodos();
            self.controller.postRequest();
          });
        });
        var removeButtons = todoTable.querySelectorAll('.removeButton');
        removeButtons.forEach(function (button) {
          button.addEventListener('click', function () {
            var guid = this.getAttribute('data-guid');
            var todo = self.controller.todoRep.findByGuid(guid);
            self.controller.deleteTodo(todo.description, todo.project);
            self.showTodos();
            self.controller.postRequest();
          });
        });

        addTodoButton.addEventListener('click', function () {
          self.addTodo(addTodoInput, project.guid);
        });

        removeProjectButton.addEventListener('click', function () {
          self.removeProject(project.name);
        });

        addTodo.appendChild(addTodoButton);
        addTodo.appendChild(addTodoInput);

        div.appendChild(title);
        div.appendChild(todoTable);
        div.appendChild(addTodo);
        div.appendChild(removeProjectButton);

        container.appendChild(div);
      });
    }
  }, {
    key: 'addProject',
    value: function addProject() {
      var addProjectButton = this.addProjectButton;
      var addProjectInput = this.addProjectInput;

      if (!addProjectInput.value) {
        console.log('Fill out the field');
      } else {
        this.controller.createProject(addProjectInput.value);
        addProjectInput.value = '';

        this.showTodos();
        this.controller.postRequest();
      }
    }
  }, {
    key: 'removeProject',
    value: function removeProject(name) {
      if (!name) {
        console.log('Fill out the field');
      } else {
        this.controller.deleteProject(name);

        this.showTodos();
        this.controller.postRequest();
      }
    }
  }, {
    key: 'addTodo',
    value: function addTodo(addTodoInput, projectGuid) {
      if (!addTodoInput.value) {
        console.log('Fill out the field');
      } else {
        this.controller.createTodo(addTodoInput.value, projectGuid);
        addTodoInput.value = '';

        this.showTodos();
        this.controller.postRequest();
      }
    }
  }, {
    key: 'run',
    value: function run() {
      this.showTodos();
    }
  }]);

  return DomRunner;
}();

exports.default = DomRunner;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL2NvbnRyb2xsZXIvQ29udHJvbGxlci5qcyIsImFwcC9zY3JpcHRzL3NyYy9tYWluLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21vZGVsL1Byb2plY3QuanMiLCJhcHAvc2NyaXB0cy9zcmMvbW9kZWwvUHJvamVjdFJlcG9zaXRvcnkuanMiLCJhcHAvc2NyaXB0cy9zcmMvbW9kZWwvVG9kby5qcyIsImFwcC9zY3JpcHRzL3NyYy9tb2RlbC9Ub2RvUmVwb3NpdG9yeS5qcyIsImFwcC9zY3JpcHRzL3NyYy9tb2RlbC9ndWlkR2VuLmpzIiwiYXBwL3NjcmlwdHMvc3JjL3ZpZXcvRG9tUnVubmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEc7QUFDbkIsaUJBQWM7QUFBQTs7QUFDWixTQUFLLE9BQUwsR0FBZSw4QkFBZjtBQUNBLFNBQUssT0FBTCxHQUFlLGlDQUFmO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLHlCQUFlLEtBQUssT0FBcEIsRUFBNkIsS0FBSyxPQUFsQyxDQUFsQjtBQUNBLFNBQUssU0FBTCxHQUFpQix3QkFBYyxLQUFLLFVBQW5CLENBQWpCO0FBQ0Q7Ozs7MEJBRUs7QUFDSixXQUFLLFNBQUwsQ0FBZSxHQUFmO0FBQ0Q7Ozs7OztrQkFWa0IsRzs7Ozs7Ozs7Ozs7QUNQckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFU7QUFDbkIsc0JBQVksT0FBWixFQUFxQixPQUFyQixFQUE4QjtBQUFBOztBQUM1QixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOzs7O2tDQUVhO0FBQ1osVUFBSSxXQUFXLEtBQUssT0FBTCxD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QUFLLFNBQUw7QUFDQSxhQUFLLFVBQUwsQ0FBZ0IsV0FBaEI7QUFDRDtBQUNGOzs7MEJBRUs7QUFDSixXQUFLLFNBQUw7QUFDRDs7Ozs7O2tCQWpKa0IsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBUb2RvIGZyb20gXCIuL21vZGVsL1RvZG9cIjtcclxuaW1wb3J0IFRvZG9SZXBvc2l0b3J5IGZyb20gXCIuL21vZGVsL1RvZG9SZXBvc2l0b3J5XCI7XHJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL21vZGVsL1Byb2plY3RcIjtcclxuaW1wb3J0IFByb2plY3RSZXBvc2l0b3J5IGZyb20gXCIuL21vZGVsL1Byb2plY3RSZXBvc2l0b3J5XCI7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgRG9tUnVubmVyIGZyb20gXCIuL3ZpZXcvRG9tUnVubmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50b2RvUmVwID0gbmV3IFRvZG9SZXBvc2l0b3J5KCk7XHJcbiAgICB0aGlzLnByb2pSZXAgPSBuZXcgUHJvamVjdFJlcG9zaXRvcnkoKTtcclxuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMudG9kb1JlcCwgdGhpcy5wcm9qUmVwKTtcclxuICAgIHRoaXMuZG9tUnVubmVyID0gbmV3IERvbVJ1bm5lcih0aGlzLmNvbnRyb2xsZXIpO1xyXG4gIH1cclxuXHJcbiAgcnVuKCkge1xyXG4gICAgdGhpcy5kb21SdW5uZXIucnVuKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBUb2RvIGZyb20gXCIuLi9tb2RlbC9Ub2RvXCI7XHJcbmltcG9ydCBUb2RvUmVwb3NpdG9yeSBmcm9tIFwiLi4vbW9kZWwvVG9kb1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uL21vZGVsL1Byb2plY3RcIjtcclxuaW1wb3J0IFByb2plY3RSZXBvc2l0b3J5IGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0UmVwb3NpdG9yeVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgY29uc3RydWN0b3IodG9kb1JlcCwgcHJvalJlcCkge1xyXG4gICAgdGhpcy50b2RvUmVwID0gdG9kb1JlcDtcclxuICAgIHRoaXMucHJvalJlcCA9IHByb2pSZXA7XHJcbiAgfVxyXG5cclxuICBwb3N0UmVxdWVzdCgpIHtcclxuICAgIHZhciBwcm9qZWN0cyA9IHRoaXMucHJvalJlcC5wcm9qZWN0cztcclxuICAgIHZhciB0b2RvcyA9IHRoaXMudG9kb1JlcC50b2RvcztcclxuXHJcbiAgICBwcm9qZWN0cyA9IEpTT04uc3RyaW5naWZ5KHByb2plY3RzKTtcclxuICAgIHRvZG9zID0gSlNPTi5zdHJpbmdpZnkodG9kb3MpO1xyXG5cclxuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgdmFyIHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDAxL2NyZWF0ZVwiO1xyXG4gICAgdmFyIHBhcmFtcyA9IGBwcm9qZWN0cz0ke3Byb2plY3RzfSZ0b2Rvcz0ke3RvZG9zfWA7XHJcbiAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xyXG5cclxuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcblxyXG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHRoaXMucmVhZHlzdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZW50IHRoZSBuZXcgb2JqZWN0cycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB4aHR0cC5zZW5kKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGlmKHRoaXMucHJvalJlcC5jb250YWlucyhuYW1lKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhpcyBwcm9qZWN0IGFscmVhZHkgZXhpc3RzIScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcclxuICAgICAgdGhpcy5wcm9qUmVwLmFkZChwcm9qZWN0KTtcclxuICAgICAgcmV0dXJuIHByb2plY3Q7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIGlmKHRoaXMudG9kb1JlcC5jb250YWlucyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhpcyB0b2RvIGFscmVhZHkgZXhpc3RzIScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHRvZG8gPSBuZXcgVG9kbyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKTtcclxuICAgICAgdGhpcy50b2RvUmVwLmFkZCh0b2RvKTtcclxuICAgICAgcmV0dXJuIHRvZG87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGlmKCF0aGlzLnByb2pSZXAuY29udGFpbnMobmFtZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHByb2plY3QgPSB0aGlzLnByb2pSZXAuZmluZEJ5TmFtZShuYW1lKTtcclxuICAgICAgdGhpcy50b2RvUmVwLnJlbW92ZUFsbFdpdGhQcm9qZWN0SWQocHJvamVjdCk7XHJcbiAgICAgIHRoaXMucHJvalJlcC5yZW1vdmUocHJvamVjdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIGlmKCF0aGlzLnRvZG9SZXAuY29udGFpbnMoZGVzY3JpcHRpb24sIHByb2plY3RJZCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1RoaXMgdG9kbyBkb2VzblxcJ3QgZXhpc3QhJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb1JlcC5nZXRUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpWzBdO1xyXG4gICAgICB0aGlzLnRvZG9SZXAucmVtb3ZlKHRvZG8pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRG9uZSh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSAhdG9kby5kb25lO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiIsIi8vIHJ1bnMgdGhlIGFwcFxyXG5cclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9hcHBcIjtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgKG5ldyBBcHAoKS5ydW4oKSk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgZ3VpZEdlbiBmcm9tICcuL2d1aWRHZW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZ3VpZCA9IGd1aWRHZW4oKTtcclxuICAgIHRoaXMuY3JlYXRlZCA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdFJlcG9zaXRvcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwMDEvcHJvamVjdHNcIjtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgZmFsc2UpO1xyXG5cclxuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgaWYoIXRoaXMucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICBzZWxmLnByb2plY3RzID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICBzZWxmLnByb2plY3RzID0gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHhodHRwLnNlbmQoKTtcclxuICB9XHJcblxyXG4gIGFkZChwcm9qZWN0KSB7XHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoKSB7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMucHJvamVjdHNdO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKHByb2plY3QpIHtcclxuICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlciggcHJvaiA9PiBwcm9qLmd1aWQgIT09IHByb2plY3QuZ3VpZClcclxuICB9XHJcblxyXG4gIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmlsdGVyKCBwcm9qID0+IHByb2oubmFtZSA9PT0gbmFtZSlbMF07XHJcbiAgfVxyXG5cclxuICBmaW5kQnlHdWlkKGd1aWQpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbHRlciggcHJvaiA9PiBwcm9qLmd1aWQgPT09IGd1aWQpWzBdO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgfVxyXG5cclxuICBjb250YWlucyhuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maWx0ZXIoIHByb2ogPT4gcHJvai5uYW1lID09PSBuYW1lICkubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBndWlkR2VuIGZyb20gJy4vZ3VpZEdlbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcclxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgcHJvamVjdEd1aWQpIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RHdWlkO1xyXG4gICAgdGhpcy5jcmVhdGVkID0gKG5ldyBEYXRlKCkpLnRvVVRDU3RyaW5nKCk7XHJcbiAgICB0aGlzLmd1aWQgPSBndWlkR2VuKCk7XHJcbiAgICB0aGlzLmRvbmUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJztcclxuXHJcbmNsYXNzIFRvZG9SZXBvc2l0b3J5IHsgLy8gdG9kb3MgbmVlZCB0byBiZSBjcmVhdGVkIGJlZm9yZSB0aGV5IGFyZSBhZGRlZFxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwMDEvdG9kb3NcIjtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgZmFsc2UpO1xyXG5cclxuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgaWYoIXRoaXMucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICBzZWxmLnRvZG9zID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICBzZWxmLnRvZG9zID0gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHhodHRwLnNlbmQoKTtcclxuICB9XHJcblxyXG4gIGFkZCh0b2RvKSB7XHJcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5tYXAoZSA9PiBlKTtcclxuICB9XHJcblxyXG4gIGdldEFsbFdpdGhQcm9qZWN0SWQocHJvamVjdCkge1xyXG4gICAgbGV0IGlkID0gcHJvamVjdC5ndWlkO1xyXG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmlsdGVyKCB0ZCA9PiB0ZC5wcm9qZWN0ID09PSBpZCApO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKHRvZG8pIHtcclxuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlcih0ZCA9PiB0ZC5ndWlkICE9PSB0b2RvLmd1aWQpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQWxsV2l0aFByb2plY3RJZChwcm9qZWN0KSB7XHJcbiAgICBsZXQgaWQgPSBwcm9qZWN0Lmd1aWQ7XHJcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIoIHRkID0+IHRkLnByb2plY3QgIT09IGlkICk7XHJcbiAgfVxyXG5cclxuICBnZXRUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbHRlcihmdW5jdGlvbih0ZCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIHRkLmRlc2NyaXB0aW9uID09PSBkZXNjcmlwdGlvblxyXG4gICAgICAgICYmIHRkLnByb2plY3QgPT09IHByb2plY3RJZFxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmaW5kQnlJbmRleChpbmRleCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9kb3NbaW5kZXhdO1xyXG4gIH1cclxuXHJcbiAgZmluZEJ5R3VpZChndWlkKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5maWx0ZXIodGQgPT4gdGQuZ3VpZCA9PT0gZ3VpZClbMF07XHJcbiAgfVxyXG5cclxuICBjb250YWlucyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBzaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9kb3MubGVuZ3RoO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9kb1JlcG9zaXRvcnk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGd1aWQoKSB7XHJcbiAgZnVuY3Rpb24gczQoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gIH1cclxuICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tUnVubmVyIHtcclxuICBjb25zdHJ1Y3Rvcihjb250cm9sbGVyKSB7XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpczsgLy9mb3IgdXNlIGluIGJ1dHRvbiBjYWxsYmFja3NcclxuXHJcbiAgICB0aGlzLmFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ1dHRvbicpO1xyXG4gICAgdGhpcy5hZGRQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdElucHV0Jyk7XHJcblxyXG4gICAgdGhpcy5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLmFkZFByb2plY3QuY2FsbChzZWxmKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHNob3dUb2RvcygpIHtcclxuICAgIHZhciBwcm9qZWN0cyA9IHRoaXMuY29udHJvbGxlci5wcm9qUmVwLmdldEFsbCgpO1xyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICB2YXIgdG9kb3MgPSB0aGlzLmNvbnRyb2xsZXIudG9kb1JlcC5nZXRBbGxXaXRoUHJvamVjdElkKHByb2plY3QpO1xyXG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuICAgICAgdmFyIHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkgxXCIpO1xyXG4gICAgICB0aXRsZS5pbm5lckhUTUwgPSBgJHtwcm9qZWN0Lm5hbWV9YDtcclxuXHJcbiAgICAgIHZhciB0b2RvVGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiVEFCTEVcIik7XHJcblxyXG4gICAgICB2YXIgYWRkVG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XHJcbiAgICAgIGFkZFRvZG8uc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFkZFRvZG8ke3Byb2plY3QuZ3VpZH1gKTtcclxuXHJcbiAgICAgIHZhciBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkJVVFRPTlwiKTtcclxuICAgICAgYWRkVG9kb0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgYWRkVG9kb0J1dHRvbiR7cHJvamVjdC5ndWlkfWApO1xyXG4gICAgICBhZGRUb2RvQnV0dG9uLmlubmVySFRNTCA9ICdBZGQgVG9kbyc7XHJcblxyXG4gICAgICB2YXIgYWRkVG9kb0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklOUFVUXCIpO1xyXG4gICAgICBhZGRUb2RvSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XHJcbiAgICAgIGFkZFRvZG9JbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcImRlc2NyaXB0aW9uXCIpO1xyXG4gICAgICBhZGRUb2RvSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGFkZFRvZG9JbnB1dCR7cHJvamVjdC5ndWlkfWApO1xyXG5cclxuICAgICAgdmFyIHJlbW92ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQlVUVE9OXCIpO1xyXG4gICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIGByZW1vdmVQcm9qZWN0QnV0dG9uJHtwcm9qZWN0Lmd1aWR9YCk7XHJcbiAgICAgIHJlbW92ZVByb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgJ3JlbW92ZVByb2plY3RCdXR0b24nKTtcclxuICAgICAgcmVtb3ZlUHJvamVjdEJ1dHRvbi5pbm5lckhUTUwgPSAnUmVtb3ZlIFByb2plY3QnO1xyXG5cclxuXHJcbiAgICAgIHZhciB0YWJsZUhUTUwgPSAnJztcclxuICAgICAgdGFibGVIVE1MICs9IGA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGg+VG9kbzwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGg+RG9uZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5gO1xyXG4gICAgICB0b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICAgIHRhYmxlSFRNTCArPSBgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0b2RvLmRlc2NyaXB0aW9ufTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RvZG8uZG9uZSA/IFwieWVzXCIgOiBcIm5vXCJ9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxidXR0b24gaWQ9XCJjaGVjayR7dG9kby5ndWlkfVwiIGNsYXNzPVwiY2hlY2tCdXR0b25cIiBkYXRhLWd1aWQ9XCIke3RvZG8uZ3VpZH1cIj5DaGVjazwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGlkPVwicmVtb3ZlJHt0b2RvLmd1aWR9XCIgY2xhc3M9XCJyZW1vdmVCdXR0b25cIiBkYXRhLWd1aWQ9XCIke3RvZG8uZ3VpZH1cIj5SZW1vdmU8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5gO1xyXG4gICAgICB9KTtcclxuICAgICAgdG9kb1RhYmxlLmlubmVySFRNTCA9IHRhYmxlSFRNTDtcclxuXHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgbGV0IGNoZWNrQnV0dG9ucyA9IHRvZG9UYWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tCdXR0b24nKTtcclxuICAgICAgY2hlY2tCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciB0b2RvID0gc2VsZi5jb250cm9sbGVyLnRvZG9SZXAuZmluZEJ5R3VpZCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1ndWlkJykpO1xyXG4gICAgICAgICAgc2VsZi5jb250cm9sbGVyLnRvZ2dsZURvbmUodG9kbyk7XHJcbiAgICAgICAgICBzZWxmLnNob3dUb2RvcygpO1xyXG4gICAgICAgICAgc2VsZi5jb250cm9sbGVyLnBvc3RSZXF1ZXN0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBsZXQgcmVtb3ZlQnV0dG9ucyA9IHRvZG9UYWJsZS5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlQnV0dG9uJyk7XHJcbiAgICAgIHJlbW92ZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIGd1aWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1ndWlkJyk7XHJcbiAgICAgICAgICB2YXIgdG9kbyA9IHNlbGYuY29udHJvbGxlci50b2RvUmVwLmZpbmRCeUd1aWQoZ3VpZCk7XHJcbiAgICAgICAgICBzZWxmLmNvbnRyb2xsZXIuZGVsZXRlVG9kbyh0b2RvLmRlc2NyaXB0aW9uLCB0b2RvLnByb2plY3QpO1xyXG4gICAgICAgICAgc2VsZi5zaG93VG9kb3MoKTtcclxuICAgICAgICAgIHNlbGYuY29udHJvbGxlci5wb3N0UmVxdWVzdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFkZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWxmLmFkZFRvZG8oYWRkVG9kb0lucHV0LCBwcm9qZWN0Lmd1aWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJlbW92ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBzZWxmLnJlbW92ZVByb2plY3QocHJvamVjdC5uYW1lKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhZGRUb2RvLmFwcGVuZENoaWxkKGFkZFRvZG9CdXR0b24pO1xyXG4gICAgICBhZGRUb2RvLmFwcGVuZENoaWxkKGFkZFRvZG9JbnB1dCk7XHJcblxyXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQodG9kb1RhYmxlKTtcclxuICAgICAgZGl2LmFwcGVuZENoaWxkKGFkZFRvZG8pO1xyXG4gICAgICBkaXYuYXBwZW5kQ2hpbGQocmVtb3ZlUHJvamVjdEJ1dHRvbik7XHJcblxyXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvamVjdCgpIHtcclxuICAgIGxldCBhZGRQcm9qZWN0QnV0dG9uID0gdGhpcy5hZGRQcm9qZWN0QnV0dG9uO1xyXG4gICAgbGV0IGFkZFByb2plY3RJbnB1dCA9IHRoaXMuYWRkUHJvamVjdElucHV0O1xyXG5cclxuICAgIGlmKCFhZGRQcm9qZWN0SW5wdXQudmFsdWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ZpbGwgb3V0IHRoZSBmaWVsZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250cm9sbGVyLmNyZWF0ZVByb2plY3QoYWRkUHJvamVjdElucHV0LnZhbHVlKTtcclxuICAgICAgYWRkUHJvamVjdElucHV0LnZhbHVlID0gJyc7XHJcblxyXG4gICAgICB0aGlzLnNob3dUb2RvcygpO1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIucG9zdFJlcXVlc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZVByb2plY3QobmFtZSkge1xyXG4gICAgaWYoIW5hbWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ZpbGwgb3V0IHRoZSBmaWVsZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250cm9sbGVyLmRlbGV0ZVByb2plY3QobmFtZSk7XHJcblxyXG4gICAgICB0aGlzLnNob3dUb2RvcygpO1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIucG9zdFJlcXVlc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvZG8oYWRkVG9kb0lucHV0LCBwcm9qZWN0R3VpZCkge1xyXG4gICAgaWYoIWFkZFRvZG9JbnB1dC52YWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnRmlsbCBvdXQgdGhlIGZpZWxkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlVG9kbyhcclxuICAgICAgICBhZGRUb2RvSW5wdXQudmFsdWUsXHJcbiAgICAgICAgcHJvamVjdEd1aWRcclxuICAgICAgKTtcclxuICAgICAgYWRkVG9kb0lucHV0LnZhbHVlID0gJyc7XHJcblxyXG4gICAgICB0aGlzLnNob3dUb2RvcygpO1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIucG9zdFJlcXVlc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJ1bigpIHtcclxuICAgIHRoaXMuc2hvd1RvZG9zKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
