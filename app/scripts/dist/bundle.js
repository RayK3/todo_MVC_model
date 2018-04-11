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
      console.log(projects);
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
    // let bike = this.controller.createProject('bike');
    // let car = this.controller.createProject('car');
    //
    // this.controller.createTodo('wash the', bike.guid);
    // this.controller.createTodo('wash the big ol\'', car.guid);

    var self = this; //for use in button callbacks

    this.addProjectButton = document.getElementById('addProjectButton');
    this.addProjectInput = document.getElementById('addProjectInput');

    this.addProjectButton.addEventListener('click', function () {
      return self.addProject.call(self);
    });

    this.removeProjectButton = document.getElementById('removeProjectButton');
    this.removeProjectInput = document.getElementById('removeProjectInput');

    this.removeProjectButton.addEventListener('click', function () {
      return self.removeProject.call(self);
    });

    this.addTodoButton = document.getElementById('addTodoButton');
    this.addTodoDescriptionInput = document.getElementById('addTodoDescriptionInput');
    this.addTodoProjectInput = document.getElementById('addTodoProjectInput');

    this.addTodoButton.addEventListener('click', function () {
      return self.addTodo.call(self);
    });

    this.removeTodoButton = document.getElementById('removeTodoButton');
    this.removeTodoDescriptionInput = document.getElementById('removeTodoDescriptionInput');
    this.removeTodoProjectInput = document.getElementById('removeTodoProjectInput');

    this.removeTodoButton.addEventListener('click', function () {
      return self.removeTodo.call(self);
    });
  }

  _createClass(DomRunner, [{
    key: 'showTodos',
    value: function showTodos(firstCall) {
      var _this = this;

      var todoTable = document.getElementById('todoTable');
      var tableHTML = '';
      tableHTML += '<tr>\n                    <th>Todo</th>\n                    <th>Project</th>\n                    <th>Done</th>\n                  </tr>';
      this.controller.todoRep.todos.forEach(function (todo) {
        tableHTML += '<tr>\n                      <td>' + todo.description + '</td>\n                      <td>' + _this.controller.projRep.findByGuid(todo.project).name + '</td>\n                      <td>' + (todo.done ? "yes" : "no") + '</td>\n                      <td><button class="checkButton" data-guid="' + todo.guid + '">Check</button></td>\n                    </tr>';
      });
      todoTable.innerHTML = tableHTML;
      var self = this;
      var checkButtons = document.querySelectorAll('.checkButton');
      checkButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
          var todo = self.controller.todoRep.findByGuid(this.getAttribute('data-guid'));
          self.controller.toggleDone(todo);
          self.showTodos(false);
        });
      });
      if (!firstCall) {
        this.controller.postRequest();
      }
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
        this.showTodos(false);
      }
    }
  }, {
    key: 'removeProject',
    value: function removeProject() {
      var removeProjectButton = this.removeProjectButton;
      var removeProjectInput = this.removeProjectInput;

      if (!removeProjectInput.value) {
        console.log('Fill out the field');
      } else {
        this.controller.deleteProject(removeProjectInput.value);
        removeProjectInput.value = '';
        this.showTodos(false);
      }
    }
  }, {
    key: 'addTodo',
    value: function addTodo() {
      var addTodoButton = this.addTodoButton;
      var addTodoDescriptionInput = this.addTodoDescriptionInput;
      var addTodoProjectInput = this.addTodoProjectInput;

      if (!addTodoDescriptionInput.value || !addTodoProjectInput.value) {
        console.log('Fill out the field');
      } else if (!this.controller.projRep.contains(addTodoProjectInput.value)) {
        console.log('That project doesn\'t exist!');
      } else {
        this.controller.createTodo(addTodoDescriptionInput.value, this.controller.projRep.findByName(addTodoProjectInput.value).guid);
        addTodoDescriptionInput.value = '';
        addTodoProjectInput.value = '';
        this.showTodos(false);
      }
    }
  }, {
    key: 'removeTodo',
    value: function removeTodo() {
      var removeTodoButton = this.removeTodoButton;
      var removeTodoDescriptionInput = this.removeTodoDescriptionInput;
      var removeTodoProjectInput = this.removeTodoProjectInput;

      if (!removeTodoDescriptionInput.value || !removeTodoProjectInput.value) {
        console.log('Fill out the field');
      } else {
        this.controller.deleteTodo(removeTodoDescriptionInput.value, this.controller.projRep.findByName(removeTodoProjectInput.value).guid);
        removeTodoDescriptionInput.value = '';
        removeTodoProjectInput.value = '';
        this.showTodos(false);
      }
    }
  }, {
    key: 'run',
    value: function run() {
      this.showTodos(true);
    }
  }]);

  return DomRunner;
}();

exports.default = DomRunner;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL2NvbnRyb2xsZXIvQ29udHJvbGxlci5qcyIsImFwcC9zY3JpcHRzL3NyYy9tYWluLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21vZGVsL1Byb2plY3QuanMiLCJhcHAvc2NyaXB0cy9zcmMvbW9kZWwvUHJvamVjdFJlcG9zaXRvcnkuanMiLCJhcHAvc2NyaXB0cy9zcmMvbW9kZWwvVG9kby5qcyIsImFwcC9zY3JpcHRzL3NyYy9tb2RlbC9Ub2RvUmVwb3NpdG9yeS5qcyIsImFwcC9zY3JpcHRzL3NyYy9tb2RlbC9ndWlkR2VuLmpzIiwiYXBwL3NjcmlwdHMvc3JjL3ZpZXcvRG9tUnVubmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEc7QUFDbkIsaUJBQWM7QUFBQTs7QUFDWixTQUFLLE9BQUwsR0FBZSw4QkFBZjtBQUNBLFNBQUssT0FBTCxHQUFlLGlDQUFmO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLHlCQUFlLEtBQUssT0FBcEIsRUFBNkIsS0FBSyxPQUFsQyxDQUFsQjtBQUNBLFNBQUssU0FBTCxHQUFpQix3QkFBYyxLQUFLLFVBQW5CLENBQWpCO0FBQ0Q7Ozs7MEJBRUs7QUFDSixXQUFLLFNBQUwsQ0FBZSxHQUFmO0FBQ0Q7Ozs7OztrQkFWa0IsRzs7Ozs7Ozs7Ozs7QUNQckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFU7QUFDbkIsc0JBQVksT0FBWixFQUFxQixPQUFyQixFQUE4QjtBQUFBOztBQUM1QixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOzs7O2tDQUVhO0FBQ1osVUFBSSxXQUFXLEtBQUssT0FBTCxD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Q0Q7Ozs7OztrQkEzSWtCLFMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVG9kbyBmcm9tIFwiLi9tb2RlbC9Ub2RvXCI7XHJcbmltcG9ydCBUb2RvUmVwb3NpdG9yeSBmcm9tIFwiLi9tb2RlbC9Ub2RvUmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgUHJvamVjdCBmcm9tIFwiLi9tb2RlbC9Qcm9qZWN0XCI7XHJcbmltcG9ydCBQcm9qZWN0UmVwb3NpdG9yeSBmcm9tIFwiLi9tb2RlbC9Qcm9qZWN0UmVwb3NpdG9yeVwiO1xyXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tIFwiLi9jb250cm9sbGVyL0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IERvbVJ1bm5lciBmcm9tIFwiLi92aWV3L0RvbVJ1bm5lclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudG9kb1JlcCA9IG5ldyBUb2RvUmVwb3NpdG9yeSgpO1xyXG4gICAgdGhpcy5wcm9qUmVwID0gbmV3IFByb2plY3RSZXBvc2l0b3J5KCk7XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih0aGlzLnRvZG9SZXAsIHRoaXMucHJvalJlcCk7XHJcbiAgICB0aGlzLmRvbVJ1bm5lciA9IG5ldyBEb21SdW5uZXIodGhpcy5jb250cm9sbGVyKTtcclxuICB9XHJcblxyXG4gIHJ1bigpIHtcclxuICAgIHRoaXMuZG9tUnVubmVyLnJ1bigpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgVG9kbyBmcm9tIFwiLi4vbW9kZWwvVG9kb1wiO1xyXG5pbXBvcnQgVG9kb1JlcG9zaXRvcnkgZnJvbSBcIi4uL21vZGVsL1RvZG9SZXBvc2l0b3J5XCI7XHJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0XCI7XHJcbmltcG9ydCBQcm9qZWN0UmVwb3NpdG9yeSBmcm9tIFwiLi4vbW9kZWwvUHJvamVjdFJlcG9zaXRvcnlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yKHRvZG9SZXAsIHByb2pSZXApIHtcclxuICAgIHRoaXMudG9kb1JlcCA9IHRvZG9SZXA7XHJcbiAgICB0aGlzLnByb2pSZXAgPSBwcm9qUmVwO1xyXG4gIH1cclxuXHJcbiAgcG9zdFJlcXVlc3QoKSB7XHJcbiAgICB2YXIgcHJvamVjdHMgPSB0aGlzLnByb2pSZXAucHJvamVjdHM7XHJcbiAgICB2YXIgdG9kb3MgPSB0aGlzLnRvZG9SZXAudG9kb3M7XHJcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XHJcbiAgICBwcm9qZWN0cyA9IEpTT04uc3RyaW5naWZ5KHByb2plY3RzKTtcclxuICAgIHRvZG9zID0gSlNPTi5zdHJpbmdpZnkodG9kb3MpO1xyXG5cclxuICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgdmFyIHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDAxL2NyZWF0ZVwiO1xyXG4gICAgdmFyIHBhcmFtcyA9IGBwcm9qZWN0cz0ke3Byb2plY3RzfSZ0b2Rvcz0ke3RvZG9zfWA7XHJcbiAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xyXG5cclxuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcblxyXG4gICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmKHRoaXMucmVhZHlzdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZW50IHRoZSBuZXcgb2JqZWN0cycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB4aHR0cC5zZW5kKHBhcmFtcyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGlmKHRoaXMucHJvalJlcC5jb250YWlucyhuYW1lKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhpcyBwcm9qZWN0IGFscmVhZHkgZXhpc3RzIScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcclxuICAgICAgdGhpcy5wcm9qUmVwLmFkZChwcm9qZWN0KTtcclxuICAgICAgcmV0dXJuIHByb2plY3Q7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIGlmKHRoaXMudG9kb1JlcC5jb250YWlucyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhpcyB0b2RvIGFscmVhZHkgZXhpc3RzIScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHRvZG8gPSBuZXcgVG9kbyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKTtcclxuICAgICAgdGhpcy50b2RvUmVwLmFkZCh0b2RvKTtcclxuICAgICAgcmV0dXJuIHRvZG87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGlmKCF0aGlzLnByb2pSZXAuY29udGFpbnMobmFtZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHByb2plY3QgPSB0aGlzLnByb2pSZXAuZmluZEJ5TmFtZShuYW1lKTtcclxuICAgICAgdGhpcy50b2RvUmVwLnJlbW92ZUFsbFdpdGhQcm9qZWN0SWQocHJvamVjdCk7XHJcbiAgICAgIHRoaXMucHJvalJlcC5yZW1vdmUocHJvamVjdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIGlmKCF0aGlzLnRvZG9SZXAuY29udGFpbnMoZGVzY3JpcHRpb24sIHByb2plY3RJZCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1RoaXMgdG9kbyBkb2VzblxcJ3QgZXhpc3QhJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb1JlcC5nZXRUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpWzBdO1xyXG4gICAgICB0aGlzLnRvZG9SZXAucmVtb3ZlKHRvZG8pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRG9uZSh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSAhdG9kby5kb25lO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiIsIi8vIHJ1bnMgdGhlIGFwcFxyXG5cclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9hcHBcIjtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgKG5ldyBBcHAoKS5ydW4oKSk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgZ3VpZEdlbiBmcm9tICcuL2d1aWRHZW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZ3VpZCA9IGd1aWRHZW4oKTtcclxuICAgIHRoaXMuY3JlYXRlZCA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdFJlcG9zaXRvcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwMDEvcHJvamVjdHNcIjtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgZmFsc2UpO1xyXG5cclxuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgaWYoIXRoaXMucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICBzZWxmLnByb2plY3RzID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICBzZWxmLnByb2plY3RzID0gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHhodHRwLnNlbmQoKTtcclxuICB9XHJcblxyXG4gIGFkZChwcm9qZWN0KSB7XHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoKSB7XHJcbiAgICByZXR1cm4gWy4uLnRoaXMucHJvamVjdHNdO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKHByb2plY3QpIHtcclxuICAgIHRoaXMucHJvamVjdHMgPSB0aGlzLnByb2plY3RzLmZpbHRlciggcHJvaiA9PiBwcm9qLmd1aWQgIT09IHByb2plY3QuZ3VpZClcclxuICB9XHJcblxyXG4gIGZpbmRCeU5hbWUobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmlsdGVyKCBwcm9qID0+IHByb2oubmFtZSA9PT0gbmFtZSlbMF07XHJcbiAgfVxyXG5cclxuICBmaW5kQnlHdWlkKGd1aWQpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbHRlciggcHJvaiA9PiBwcm9qLmd1aWQgPT09IGd1aWQpWzBdO1xyXG4gIH1cclxuXHJcbiAgY2xlYXIoKSB7XHJcbiAgICB0aGlzLnByb2plY3RzID0gW107XHJcbiAgfVxyXG5cclxuICBjb250YWlucyhuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maWx0ZXIoIHByb2ogPT4gcHJvai5uYW1lID09PSBuYW1lICkubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBndWlkR2VuIGZyb20gJy4vZ3VpZEdlbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIHtcclxuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgcHJvamVjdEd1aWQpIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RHdWlkO1xyXG4gICAgdGhpcy5jcmVhdGVkID0gKG5ldyBEYXRlKCkpLnRvVVRDU3RyaW5nKCk7XHJcbiAgICB0aGlzLmd1aWQgPSBndWlkR2VuKCk7XHJcbiAgICB0aGlzLmRvbmUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJztcclxuXHJcbmNsYXNzIFRvZG9SZXBvc2l0b3J5IHsgLy8gdG9kb3MgbmVlZCB0byBiZSBjcmVhdGVkIGJlZm9yZSB0aGV5IGFyZSBhZGRlZFxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwMDEvdG9kb3NcIjtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB4aHR0cC5vcGVuKFwiR0VUXCIsIHVybCwgZmFsc2UpO1xyXG5cclxuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7XHJcbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgaWYoIXRoaXMucmVzcG9uc2VUZXh0KSB7XHJcbiAgICAgICAgICBzZWxmLnRvZG9zID0gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICBzZWxmLnRvZG9zID0gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHhodHRwLnNlbmQoKTtcclxuICB9XHJcblxyXG4gIGFkZCh0b2RvKSB7XHJcbiAgICB0aGlzLnRvZG9zLnB1c2godG9kbyk7XHJcbiAgfVxyXG5cclxuICBnZXRBbGwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5tYXAoZSA9PiBlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZSh0b2RvKSB7XHJcbiAgICB0aGlzLnRvZG9zID0gdGhpcy50b2Rvcy5maWx0ZXIodGQgPT4gdGQuZ3VpZCAhPT0gdG9kby5ndWlkKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUFsbFdpdGhQcm9qZWN0SWQocHJvamVjdCkge1xyXG4gICAgbGV0IGlkID0gcHJvamVjdC5ndWlkO1xyXG4gICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKCB0ZCA9PiB0ZC5wcm9qZWN0ICE9PSBpZCApO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9kbyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5maWx0ZXIoZnVuY3Rpb24odGQpIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICB0ZC5kZXNjcmlwdGlvbiA9PT0gZGVzY3JpcHRpb25cclxuICAgICAgICAmJiB0ZC5wcm9qZWN0ID09PSBwcm9qZWN0SWRcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZmluZEJ5SW5kZXgoaW5kZXgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvZG9zW2luZGV4XTtcclxuICB9XHJcblxyXG4gIGZpbmRCeUd1aWQoZ3VpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmlsdGVyKHRkID0+IHRkLmd1aWQgPT09IGd1aWQpWzBdO1xyXG4gIH1cclxuXHJcbiAgY29udGFpbnMoZGVzY3JpcHRpb24sIHByb2plY3RJZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9kbyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKS5sZW5ndGggPiAwO1xyXG4gIH1cclxuXHJcbiAgc2l6ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvZG9zLmxlbmd0aDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvZG9SZXBvc2l0b3J5O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBndWlkKCkge1xyXG4gIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgLnN1YnN0cmluZygxKTtcclxuICB9XHJcbiAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERvbVJ1bm5lciB7XHJcbiAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xyXG4gICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcclxuICAgIC8vIGxldCBiaWtlID0gdGhpcy5jb250cm9sbGVyLmNyZWF0ZVByb2plY3QoJ2Jpa2UnKTtcclxuICAgIC8vIGxldCBjYXIgPSB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlUHJvamVjdCgnY2FyJyk7XHJcbiAgICAvL1xyXG4gICAgLy8gdGhpcy5jb250cm9sbGVyLmNyZWF0ZVRvZG8oJ3dhc2ggdGhlJywgYmlrZS5ndWlkKTtcclxuICAgIC8vIHRoaXMuY29udHJvbGxlci5jcmVhdGVUb2RvKCd3YXNoIHRoZSBiaWcgb2xcXCcnLCBjYXIuZ3VpZCk7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzOyAvL2ZvciB1c2UgaW4gYnV0dG9uIGNhbGxiYWNrc1xyXG5cclxuICAgIHRoaXMuYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRQcm9qZWN0QnV0dG9uJyk7XHJcbiAgICB0aGlzLmFkZFByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRQcm9qZWN0SW5wdXQnKTtcclxuXHJcbiAgICB0aGlzLmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuYWRkUHJvamVjdC5jYWxsKHNlbGYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZVByb2plY3RCdXR0b24nKTtcclxuICAgIHRoaXMucmVtb3ZlUHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZVByb2plY3RJbnB1dCcpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5yZW1vdmVQcm9qZWN0LmNhbGwoc2VsZik7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmFkZFRvZG9CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVG9kb0J1dHRvbicpO1xyXG4gICAgdGhpcy5hZGRUb2RvRGVzY3JpcHRpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUb2RvRGVzY3JpcHRpb25JbnB1dCcpO1xyXG4gICAgdGhpcy5hZGRUb2RvUHJvamVjdElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRvZG9Qcm9qZWN0SW5wdXQnKTtcclxuXHJcbiAgICB0aGlzLmFkZFRvZG9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHNlbGYuYWRkVG9kby5jYWxsKHNlbGYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVUb2RvQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZVRvZG9CdXR0b24nKTtcclxuICAgIHRoaXMucmVtb3ZlVG9kb0Rlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlVG9kb0Rlc2NyaXB0aW9uSW5wdXQnKTtcclxuICAgIHRoaXMucmVtb3ZlVG9kb1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVUb2RvUHJvamVjdElucHV0Jyk7XHJcblxyXG4gICAgdGhpcy5yZW1vdmVUb2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLnJlbW92ZVRvZG8uY2FsbChzZWxmKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBzaG93VG9kb3MoZmlyc3RDYWxsKSB7XHJcbiAgICB2YXIgdG9kb1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG9UYWJsZScpO1xyXG4gICAgdmFyIHRhYmxlSFRNTCA9ICcnO1xyXG4gICAgdGFibGVIVE1MICs9IGA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPlRvZG88L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aD5Qcm9qZWN0PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+RG9uZTwvdGg+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgIHRoaXMuY29udHJvbGxlci50b2RvUmVwLnRvZG9zLmZvckVhY2godG9kbyA9PiB7XHJcbiAgICAgIHRhYmxlSFRNTCArPSBgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dG9kby5kZXNjcmlwdGlvbn08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkPiR7dGhpcy5jb250cm9sbGVyLnByb2pSZXAuZmluZEJ5R3VpZCh0b2RvLnByb2plY3QpLm5hbWV9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RvZG8uZG9uZSA/IFwieWVzXCIgOiBcIm5vXCJ9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD48YnV0dG9uIGNsYXNzPVwiY2hlY2tCdXR0b25cIiBkYXRhLWd1aWQ9XCIke3RvZG8uZ3VpZH1cIj5DaGVjazwvYnV0dG9uPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5gO1xyXG4gICAgfSk7XHJcbiAgICB0b2RvVGFibGUuaW5uZXJIVE1MID0gdGFibGVIVE1MO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGNoZWNrQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja0J1dHRvbicpO1xyXG4gICAgY2hlY2tCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcclxuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRvZG8gPSBzZWxmLmNvbnRyb2xsZXIudG9kb1JlcC5maW5kQnlHdWlkKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWd1aWQnKSk7XHJcbiAgICAgICAgc2VsZi5jb250cm9sbGVyLnRvZ2dsZURvbmUodG9kbyk7XHJcbiAgICAgICAgc2VsZi5zaG93VG9kb3MoZmFsc2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaWYoIWZpcnN0Q2FsbCkge1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIucG9zdFJlcXVlc3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFByb2plY3QoKSB7XHJcbiAgICBsZXQgYWRkUHJvamVjdEJ1dHRvbiA9IHRoaXMuYWRkUHJvamVjdEJ1dHRvbjtcclxuICAgIGxldCBhZGRQcm9qZWN0SW5wdXQgPSB0aGlzLmFkZFByb2plY3RJbnB1dDtcclxuXHJcbiAgICBpZighYWRkUHJvamVjdElucHV0LnZhbHVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdGaWxsIG91dCB0aGUgZmllbGQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udHJvbGxlci5jcmVhdGVQcm9qZWN0KGFkZFByb2plY3RJbnB1dC52YWx1ZSk7XHJcbiAgICAgIGFkZFByb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICB0aGlzLnNob3dUb2RvcyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVQcm9qZWN0KCkge1xyXG4gICAgbGV0IHJlbW92ZVByb2plY3RCdXR0b24gPSB0aGlzLnJlbW92ZVByb2plY3RCdXR0b247XHJcbiAgICBsZXQgcmVtb3ZlUHJvamVjdElucHV0ID0gdGhpcy5yZW1vdmVQcm9qZWN0SW5wdXQ7XHJcblxyXG4gICAgaWYoIXJlbW92ZVByb2plY3RJbnB1dC52YWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnRmlsbCBvdXQgdGhlIGZpZWxkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIuZGVsZXRlUHJvamVjdChyZW1vdmVQcm9qZWN0SW5wdXQudmFsdWUpO1xyXG4gICAgICByZW1vdmVQcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5zaG93VG9kb3MoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkVG9kbygpIHtcclxuICAgIGxldCBhZGRUb2RvQnV0dG9uID0gdGhpcy5hZGRUb2RvQnV0dG9uO1xyXG4gICAgbGV0IGFkZFRvZG9EZXNjcmlwdGlvbklucHV0ID0gdGhpcy5hZGRUb2RvRGVzY3JpcHRpb25JbnB1dDtcclxuICAgIGxldCBhZGRUb2RvUHJvamVjdElucHV0ID0gdGhpcy5hZGRUb2RvUHJvamVjdElucHV0O1xyXG5cclxuICAgIGlmKCFhZGRUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSB8fCAhYWRkVG9kb1Byb2plY3RJbnB1dC52YWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnRmlsbCBvdXQgdGhlIGZpZWxkJyk7XHJcbiAgICB9IGVsc2UgaWYoIXRoaXMuY29udHJvbGxlci5wcm9qUmVwLmNvbnRhaW5zKGFkZFRvZG9Qcm9qZWN0SW5wdXQudmFsdWUpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdUaGF0IHByb2plY3QgZG9lc25cXCd0IGV4aXN0IScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250cm9sbGVyLmNyZWF0ZVRvZG8oXHJcbiAgICAgICAgYWRkVG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUsXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnByb2pSZXAuZmluZEJ5TmFtZShhZGRUb2RvUHJvamVjdElucHV0LnZhbHVlKS5ndWlkXHJcbiAgICAgICk7XHJcbiAgICAgIGFkZFRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgIGFkZFRvZG9Qcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5zaG93VG9kb3MoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlVG9kbygpIHtcclxuICAgIGxldCByZW1vdmVUb2RvQnV0dG9uID0gdGhpcy5yZW1vdmVUb2RvQnV0dG9uO1xyXG4gICAgbGV0IHJlbW92ZVRvZG9EZXNjcmlwdGlvbklucHV0ID0gdGhpcy5yZW1vdmVUb2RvRGVzY3JpcHRpb25JbnB1dDtcclxuICAgIGxldCByZW1vdmVUb2RvUHJvamVjdElucHV0ID0gdGhpcy5yZW1vdmVUb2RvUHJvamVjdElucHV0O1xyXG5cclxuICAgIGlmKCFyZW1vdmVUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSB8fCAhcmVtb3ZlVG9kb1Byb2plY3RJbnB1dC52YWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnRmlsbCBvdXQgdGhlIGZpZWxkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIuZGVsZXRlVG9kbyhcclxuICAgICAgICByZW1vdmVUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSxcclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIucHJvalJlcC5maW5kQnlOYW1lKHJlbW92ZVRvZG9Qcm9qZWN0SW5wdXQudmFsdWUpLmd1aWRcclxuICAgICAgKTtcclxuICAgICAgcmVtb3ZlVG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgcmVtb3ZlVG9kb1Byb2plY3RJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICB0aGlzLnNob3dUb2RvcyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBydW4oKSB7XHJcbiAgICB0aGlzLnNob3dUb2Rvcyh0cnVlKTtcclxuICB9XHJcbn1cclxuIl19
