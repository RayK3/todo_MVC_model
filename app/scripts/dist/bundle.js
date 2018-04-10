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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProjectRepository = function () {
  function ProjectRepository() {
    _classCallCheck(this, ProjectRepository);

    this.projects = [];
  }

  _createClass(ProjectRepository, [{
    key: 'add',
    value: function add(project) {
      this.projects.push(project);
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return [].concat(_toConsumableArray(this.projects));
    }
  }, {
    key: 'remove',
    value: function remove(project) {
      this.projects = this.projects.filter(function (proj) {
        return proj.guid !== project.guid;
      });
    }
  }, {
    key: 'findByName',
    value: function findByName(name) {
      return this.projects.filter(function (proj) {
        return proj.name === name;
      })[0];
    }
  }, {
    key: 'findByGuid',
    value: function findByGuid(guid) {
      return this.projects.filter(function (proj) {
        return proj.guid === guid;
      })[0];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.projects = [];
    }
  }, {
    key: 'contains',
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Todo = require('./Todo');

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoRepository = function () {
  // todos need to be created before they are added
  function TodoRepository() {
    _classCallCheck(this, TodoRepository);

    this.todos = [];
  }

  _createClass(TodoRepository, [{
    key: 'add',
    value: function add(todo) {
      this.todos.push(todo);
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return this.todos.map(function (e) {
        return e;
      });
    }
  }, {
    key: 'remove',
    value: function remove(todo) {
      this.todos = this.todos.filter(function (td) {
        return td.guid !== todo.guid;
      });
    }
  }, {
    key: 'removeAllWithProjectId',
    value: function removeAllWithProjectId(project) {
      var id = project.guid;
      this.todos = this.todos.filter(function (td) {
        return td.project !== id;
      });
    }
  }, {
    key: 'getTodo',
    value: function getTodo(description, projectId) {
      return this.todos.filter(function (td) {
        return td.description === description && td.project === projectId;
      });
    }
  }, {
    key: 'findByIndex',
    value: function findByIndex(index) {
      return this.todos[index];
    }
  }, {
    key: 'findByGuid',
    value: function findByGuid(guid) {
      return this.todos.filter(function (td) {
        return td.guid === guid;
      })[0];
    }
  }, {
    key: 'contains',
    value: function contains(description, projectId) {
      return this.getTodo(description, projectId).length > 0;
    }
  }, {
    key: 'size',
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
    value: function showTodos() {
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
          self.showTodos();
        });
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
        this.showTodos();
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
        this.showTodos();
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
        this.showTodos();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL2NvbnRyb2xsZXIvQ29udHJvbGxlci5qcyIsImFwcC9zY3JpcHRzL3NyYy9tYWluLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21vZGVsL1Byb2plY3QuanMiLCJhcHAvc2NyaXB0cy9zcmMvbW9kZWwvUHJvamVjdFJlcG9zaXRvcnkuanMiLCJhcHAvc2NyaXB0cy9zcmMvbW9kZWwvVG9kby5qcyIsImFwcC9zY3JpcHRzL3NyYy9tb2RlbC9Ub2RvUmVwb3NpdG9yeS5qcyIsImFwcC9zY3JpcHRzL3NyYy9tb2RlbC9ndWlkR2VuLmpzIiwiYXBwL3NjcmlwdHMvc3JjL3ZpZXcvRG9tUnVubmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLEc7QUFDbkIsaUJBQWM7QUFBQTs7QUFDWixTQUFLLE9BQUwsR0FBZSw4QkFBZjtBQUNBLFNBQUssT0FBTCxHQUFlLGlDQUFmO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLHlCQUFlLEtBQUssT0FBcEIsRUFBNkIsS0FBSyxPQUFsQyxDQUFsQjtBQUNBLFNBQUssU0FBTCxHQUFpQix3QkFBYyxLQUFLLFVBQW5CLENBQWpCO0FBQ0Q7Ozs7MEJBRUs7QUFDSixXQUFLLFNBQUwsQ0FBZSxHQUFmO0FBQ0Q7Ozs7OztrQkFWa0IsRzs7Ozs7Ozs7Ozs7QUNQckI7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCLFU7QUFDbkIsc0JBQVksT0FBWixFQUFxQixPQUFyQixFQUE4QjtBQUFBOztBQUM1QixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNEOzs7O2tDQUVhLEksRUFBTTtBQUNsQixVQUFHLEtBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsSUFBdEIsQ0FBSCxFQUFnQztBQUM5QixnQkFBUSxHQUFSLENBQVksOEJBQVo7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJLFVBQVUsc0JBQVksSUFBWixDQUFkO0FBQ0EsYUFBSyxPQUFMLENBQWEsR0FBYixDQUFpQixPQUFqQjtBQUNBLGVBQU8sT0FBUDtBQUNEO0FBQ0Y7OzsrQkFFVSxXLEVBQWEsUyxFQUFXO0FBQ2pDLFVBQUcsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixXQUF0QixFQUFtQyxTQUFuQyxDQUFILEVBQWtEO0FBQ2hELGdCQUFRLEdBQVIsQ0FBWSwyQkFBWjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUksT0FBTyxtQkFBUyxXQUFULEVBQXNCLFNBQXRCLENBQVg7QUFDQSxhQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLElBQWpCO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRjs7O2tDQUVhLEksRUFBTTtBQUNsQixVQUFHLENBQUMsS0FBSyxPQUFMLENBQWEsUUFBYixDQUFzQixJQUF0QixDQUFKLEVBQWlDO0FBQy9CO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxVQUFVLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBd0IsSUFBeEIsQ0FBZDtBQUNBLGFBQUssT0FBTCxDQUFhLHNCQUFiLENBQW9DLE9BQXBDO0FBQ0EsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixPQUFwQjtBQUNEO0FBQ0Y7OzsrQkFFVSxXLEVBQWEsUyxFQUFXO0FBQ2pDLFVBQUcsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLFdBQXRCLEVBQW1DLFNBQW5DLENBQUosRUFBbUQ7QUFDakQsZ0JBQVEsR0FBUixDQUFZLDJCQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSSxPQUFPLEtBQUssT0FBTCxDQUFhLE9BQWIsQ0FBcUIsV0FBckIsRUFBa0MsU0FBbEMsRUFBNkMsQ0FBN0MsQ0FBWDtBQUNBLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEI7QUFDRDtBQUNGOzs7K0JBRVUsSSxFQUFNO0FBQ2YsV0FBSyxJQUFMLEdBQVksQ0FBQyxLQUFLLElBQWxCO0FBQ0Q7Ozs7OztrQkEvQ2tCLFU7Ozs7O0FDSHJCOzs7Ozs7QUFFQSxPQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDbkMsc0JBQVUsR0FBVixFQUFEO0FBQ0QsQ0FGRCxFLENBSkE7Ozs7Ozs7OztBQ0FBOzs7Ozs7OztJQUVxQixPLEdBQ25CLGlCQUFZLElBQVosRUFBa0I7QUFBQTs7QUFDaEIsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssSUFBTCxHQUFZLHdCQUFaO0FBQ0EsT0FBSyxPQUFMLEdBQWdCLElBQUksSUFBSixFQUFELENBQWEsV0FBYixFQUFmO0FBQ0QsQzs7a0JBTGtCLE87Ozs7Ozs7Ozs7O0FDRnJCOzs7Ozs7Ozs7O0lBRXFCLGlCO0FBQ25CLCtCQUFjO0FBQUE7O0FBQ1osU0FBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0Q7Ozs7d0JBRUcsTyxFQUFTO0FBQ1gsV0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixPQUFuQjtBQUNEOzs7NkJBRVE7QUFDUCwwQ0FBVyxLQUFLLFFBQWhCO0FBQ0Q7OzsyQkFFTSxPLEVBQVM7QUFDZCxXQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFzQjtBQUFBLGVBQVEsS0FBSyxJQUFMLEtBQWMsUUFBUSxJQUE5QjtBQUFBLE9BQXRCLENBQWhCO0FBQ0Q7OzsrQkFFVSxJLEVBQU07QUFDZixhQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBc0I7QUFBQSxlQUFRLEtBQUssSUFBTCxLQUFjLElBQXRCO0FBQUEsT0FBdEIsRUFBa0QsQ0FBbEQsQ0FBUDtBQUNEOzs7K0JBRVUsSSxFQUFNO0FBQ2YsYUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXNCO0FBQUEsZUFBUSxLQUFLLElBQUwsS0FBYyxJQUF0QjtBQUFBLE9BQXRCLEVBQWtELENBQWxELENBQVA7QUFDRDs7OzRCQUVPO0FBQ04sV0FBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0Q7Ozs2QkFFUSxJLEVBQU07QUFDYixhQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBc0I7QUFBQSxlQUFRLEtBQUssSUFBTCxLQUFjLElBQXRCO0FBQUEsT0FBdEIsRUFBbUQsTUFBbkQsR0FBNEQsQ0FBbkU7QUFDRDs7Ozs7O2tCQS9Ca0IsaUI7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7SUFFcUIsSSxHQUNuQixjQUFZLFdBQVosRUFBeUIsV0FBekIsRUFBc0M7QUFBQTs7QUFDcEMsT0FBSyxXQUFMLEdBQW1CLFdBQW5CO0FBQ0EsT0FBSyxPQUFMLEdBQWUsV0FBZjtBQUNBLE9BQUssT0FBTCxHQUFnQixJQUFJLElBQUosRUFBRCxDQUFhLFdBQWIsRUFBZjtBQUNBLE9BQUssSUFBTCxHQUFZLHdCQUFaO0FBQ0EsT0FBSyxJQUFMLEdBQVksS0FBWjtBQUNELEM7O2tCQVBrQixJOzs7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7SUFFTSxjO0FBQWlCO0FBQ3JCLDRCQUFjO0FBQUE7O0FBQ1osU0FBSyxLQUFMLEdBQWEsRUFBYjtBQUNEOzs7O3dCQUVHLEksRUFBTTtBQUNSLFdBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEI7QUFDRDs7OzZCQUVRO0FBQ1AsYUFBTyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWU7QUFBQSxlQUFLLENBQUw7QUFBQSxPQUFmLENBQVA7QUFDRDs7OzJCQUVNLEksRUFBTTtBQUNYLFdBQUssS0FBTCxHQUFhLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0I7QUFBQSxlQUFNLEdBQUcsSUFBSCxLQUFZLEtBQUssSUFBdkI7QUFBQSxPQUFsQixDQUFiO0FBQ0Q7OzsyQ0FFc0IsTyxFQUFTO0FBQzlCLFVBQUksS0FBSyxRQUFRLElBQWpCO0FBQ0EsV0FBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFtQjtBQUFBLGVBQU0sR0FBRyxPQUFILEtBQWUsRUFBckI7QUFBQSxPQUFuQixDQUFiO0FBQ0Q7Ozs0QkFFTyxXLEVBQWEsUyxFQUFXO0FBQzlCLGFBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixVQUFTLEVBQVQsRUFBYTtBQUNwQyxlQUNFLEdBQUcsV0FBSCxLQUFtQixXQUFuQixJQUNHLEdBQUcsT0FBSCxLQUFlLFNBRnBCO0FBSUQsT0FMTSxDQUFQO0FBTUQ7OztnQ0FFVyxLLEVBQU87QUFDakIsYUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQVA7QUFDRDs7OytCQUVVLEksRUFBTTtBQUNmLGFBQU8sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQjtBQUFBLGVBQU0sR0FBRyxJQUFILEtBQVksSUFBbEI7QUFBQSxPQUFsQixFQUEwQyxDQUExQyxDQUFQO0FBQ0Q7Ozs2QkFFUSxXLEVBQWEsUyxFQUFXO0FBQy9CLGFBQU8sS0FBSyxPQUFMLENBQWEsV0FBYixFQUEwQixTQUExQixFQUFxQyxNQUFyQyxHQUE4QyxDQUFyRDtBQUNEOzs7MkJBRU07QUFDTCxhQUFPLEtBQUssS0FBTCxDQUFXLE1BQWxCO0FBQ0Q7Ozs7OztrQkFHWSxjOzs7Ozs7OztrQkNsRFMsSTtBQUFULFNBQVMsSUFBVCxHQUFnQjtBQUM3QixXQUFTLEVBQVQsR0FBYztBQUNaLFdBQU8sS0FBSyxLQUFMLENBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTCxFQUFMLElBQXNCLE9BQWpDLEVBQ0osUUFESSxDQUNLLEVBREwsRUFFSixTQUZJLENBRU0sQ0FGTixDQUFQO0FBR0Q7QUFDRCxTQUFPLE9BQU8sSUFBUCxHQUFjLEdBQWQsR0FBb0IsSUFBcEIsR0FBMkIsR0FBM0IsR0FBaUMsSUFBakMsR0FBd0MsR0FBeEMsR0FBOEMsSUFBOUMsR0FBcUQsR0FBckQsR0FBMkQsSUFBM0QsR0FBa0UsSUFBbEUsR0FBeUUsSUFBaEY7QUFDRDs7Ozs7Ozs7Ozs7OztJQ1BvQixTO0FBQ25CLHFCQUFZLFVBQVosRUFBd0I7QUFBQTs7QUFDdEIsU0FBSyxVQUFMLEdBQWtCLFVBQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFJLE9BQU8sSUFBWCxDQVJzQixDQVFMOztBQUVqQixTQUFLLGdCQUFMLEdBQXdCLFNBQVMsY0FBVCxDQUF3QixrQkFBeEIsQ0FBeEI7QUFDQSxTQUFLLGVBQUwsR0FBdUIsU0FBUyxjQUFULENBQXdCLGlCQUF4QixDQUF2Qjs7QUFFQSxTQUFLLGdCQUFMLENBQXNCLGdCQUF0QixDQUF1QyxPQUF2QyxFQUFnRCxZQUFXO0FBQ3pELGFBQU8sS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQVA7QUFDRCxLQUZEOztBQUlBLFNBQUssbUJBQUwsR0FBMkIsU0FBUyxjQUFULENBQXdCLHFCQUF4QixDQUEzQjtBQUNBLFNBQUssa0JBQUwsR0FBMEIsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUExQjs7QUFFQSxTQUFLLG1CQUFMLENBQXlCLGdCQUF6QixDQUEwQyxPQUExQyxFQUFtRCxZQUFXO0FBQzVELGFBQU8sS0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCLElBQXhCLENBQVA7QUFDRCxLQUZEOztBQUlBLFNBQUssYUFBTCxHQUFxQixTQUFTLGNBQVQsQ0FBd0IsZUFBeEIsQ0FBckI7QUFDQSxTQUFLLHVCQUFMLEdBQStCLFNBQVMsY0FBVCxDQUF3Qix5QkFBeEIsQ0FBL0I7QUFDQSxTQUFLLG1CQUFMLEdBQTJCLFNBQVMsY0FBVCxDQUF3QixxQkFBeEIsQ0FBM0I7O0FBRUEsU0FBSyxhQUFMLENBQW1CLGdCQUFuQixDQUFvQyxPQUFwQyxFQUE2QyxZQUFXO0FBQ3RELGFBQU8sS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixJQUFsQixDQUFQO0FBQ0QsS0FGRDs7QUFJQSxTQUFLLGdCQUFMLEdBQXdCLFNBQVMsY0FBVCxDQUF3QixrQkFBeEIsQ0FBeEI7QUFDQSxTQUFLLDBCQUFMLEdBQWtDLFNBQVMsY0FBVCxDQUF3Qiw0QkFBeEIsQ0FBbEM7QUFDQSxTQUFLLHNCQUFMLEdBQThCLFNBQVMsY0FBVCxDQUF3Qix3QkFBeEIsQ0FBOUI7O0FBRUEsU0FBSyxnQkFBTCxDQUFzQixnQkFBdEIsQ0FBdUMsT0FBdkMsRUFBZ0QsWUFBVztBQUN6RCxhQUFPLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQixJQUFyQixDQUFQO0FBQ0QsS0FGRDtBQUdEOzs7O2dDQUVXO0FBQUE7O0FBQ1YsVUFBSSxZQUFZLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUNBLFVBQUksWUFBWSxFQUFoQjtBQUNBO0FBS0EsV0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLEtBQXhCLENBQThCLE9BQTlCLENBQXNDLGdCQUFRO0FBQzVDLDBEQUNzQixLQUFLLFdBRDNCLHlDQUVzQixNQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsVUFBeEIsQ0FBbUMsS0FBSyxPQUF4QyxFQUFpRCxJQUZ2RSwwQ0FHc0IsS0FBSyxJQUFMLEdBQVksS0FBWixHQUFvQixJQUgxQyxpRkFJNkQsS0FBSyxJQUpsRTtBQU1ELE9BUEQ7QUFRQSxnQkFBVSxTQUFWLEdBQXNCLFNBQXRCO0FBQ0EsVUFBSSxPQUFPLElBQVg7QUFDQSxVQUFJLGVBQWUsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUFuQjtBQUNBLG1CQUFhLE9BQWIsQ0FBcUIsVUFBQyxNQUFELEVBQVMsS0FBVCxFQUFtQjtBQUN0QyxlQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLFlBQVc7QUFDMUMsY0FBSSxPQUFPLEtBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixVQUF4QixDQUFtQyxLQUFLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBbkMsQ0FBWDtBQUNBLGVBQUssVUFBTCxDQUFnQixVQUFoQixDQUEyQixJQUEzQjtBQUNBLGVBQUssU0FBTDtBQUNELFNBSkQ7QUFLRCxPQU5EO0FBT0Q7OztpQ0FFWTtBQUNYLFVBQUksbUJBQW1CLEtBQUssZ0JBQTVCO0FBQ0EsVUFBSSxrQkFBa0IsS0FBSyxlQUEzQjs7QUFFQSxVQUFHLENBQUMsZ0JBQWdCLEtBQXBCLEVBQTJCO0FBQ3pCLGdCQUFRLEdBQVIsQ0FBWSxvQkFBWjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssVUFBTCxDQUFnQixhQUFoQixDQUE4QixnQkFBZ0IsS0FBOUM7QUFDQSx3QkFBZ0IsS0FBaEIsR0FBd0IsRUFBeEI7QUFDQSxhQUFLLFNBQUw7QUFDRDtBQUNGOzs7b0NBRWU7QUFDZCxVQUFJLHNCQUFzQixLQUFLLG1CQUEvQjtBQUNBLFVBQUkscUJBQXFCLEtBQUssa0JBQTlCOztBQUVBLFVBQUcsQ0FBQyxtQkFBbUIsS0FBdkIsRUFBOEI7QUFDNUIsZ0JBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSyxVQUFMLENBQWdCLGFBQWhCLENBQThCLG1CQUFtQixLQUFqRDtBQUNBLDJCQUFtQixLQUFuQixHQUEyQixFQUEzQjtBQUNBLGFBQUssU0FBTDtBQUNEO0FBQ0Y7Ozs4QkFFUztBQUNSLFVBQUksZ0JBQWdCLEtBQUssYUFBekI7QUFDQSxVQUFJLDBCQUEwQixLQUFLLHVCQUFuQztBQUNBLFVBQUksc0JBQXNCLEtBQUssbUJBQS9COztBQUVBLFVBQUcsQ0FBQyx3QkFBd0IsS0FBekIsSUFBa0MsQ0FBQyxvQkFBb0IsS0FBMUQsRUFBaUU7QUFDL0QsZ0JBQVEsR0FBUixDQUFZLG9CQUFaO0FBQ0QsT0FGRCxNQUVPLElBQUcsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBd0IsUUFBeEIsQ0FBaUMsb0JBQW9CLEtBQXJELENBQUosRUFBaUU7QUFDdEUsZ0JBQVEsR0FBUixDQUFZLDhCQUFaO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsYUFBSyxVQUFMLENBQWdCLFVBQWhCLENBQ0Usd0JBQXdCLEtBRDFCLEVBRUUsS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCLFVBQXhCLENBQW1DLG9CQUFvQixLQUF2RCxFQUE4RCxJQUZoRTtBQUlBLGdDQUF3QixLQUF4QixHQUFnQyxFQUFoQztBQUNBLDRCQUFvQixLQUFwQixHQUE0QixFQUE1QjtBQUNBLGFBQUssU0FBTDtBQUNEO0FBQ0Y7OztpQ0FFWTtBQUNYLFVBQUksbUJBQW1CLEtBQUssZ0JBQTVCO0FBQ0EsVUFBSSw2QkFBNkIsS0FBSywwQkFBdEM7QUFDQSxVQUFJLHlCQUF5QixLQUFLLHNCQUFsQzs7QUFFQSxVQUFHLENBQUMsMkJBQTJCLEtBQTVCLElBQXFDLENBQUMsdUJBQXVCLEtBQWhFLEVBQXVFO0FBQ3JFLGdCQUFRLEdBQVIsQ0FBWSxvQkFBWjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUssVUFBTCxDQUFnQixVQUFoQixDQUNFLDJCQUEyQixLQUQ3QixFQUVFLEtBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixVQUF4QixDQUFtQyx1QkFBdUIsS0FBMUQsRUFBaUUsSUFGbkU7QUFJQSxtQ0FBMkIsS0FBM0IsR0FBbUMsRUFBbkM7QUFDQSwrQkFBdUIsS0FBdkIsR0FBK0IsRUFBL0I7QUFDQSxhQUFLLFNBQUw7QUFDRDtBQUNGOzs7MEJBRUs7QUFDSixXQUFLLFNBQUw7QUFDRDs7Ozs7O2tCQXhJa0IsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBUb2RvIGZyb20gXCIuL21vZGVsL1RvZG9cIjtcclxuaW1wb3J0IFRvZG9SZXBvc2l0b3J5IGZyb20gXCIuL21vZGVsL1RvZG9SZXBvc2l0b3J5XCI7XHJcbmltcG9ydCBQcm9qZWN0IGZyb20gXCIuL21vZGVsL1Byb2plY3RcIjtcclxuaW1wb3J0IFByb2plY3RSZXBvc2l0b3J5IGZyb20gXCIuL21vZGVsL1Byb2plY3RSZXBvc2l0b3J5XCI7XHJcbmltcG9ydCBDb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgRG9tUnVubmVyIGZyb20gXCIuL3ZpZXcvRG9tUnVubmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50b2RvUmVwID0gbmV3IFRvZG9SZXBvc2l0b3J5KCk7XHJcbiAgICB0aGlzLnByb2pSZXAgPSBuZXcgUHJvamVjdFJlcG9zaXRvcnkoKTtcclxuICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMudG9kb1JlcCwgdGhpcy5wcm9qUmVwKTtcclxuICAgIHRoaXMuZG9tUnVubmVyID0gbmV3IERvbVJ1bm5lcih0aGlzLmNvbnRyb2xsZXIpO1xyXG4gIH1cclxuXHJcbiAgcnVuKCkge1xyXG4gICAgdGhpcy5kb21SdW5uZXIucnVuKCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBUb2RvIGZyb20gXCIuLi9tb2RlbC9Ub2RvXCI7XHJcbmltcG9ydCBUb2RvUmVwb3NpdG9yeSBmcm9tIFwiLi4vbW9kZWwvVG9kb1JlcG9zaXRvcnlcIjtcclxuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4uL21vZGVsL1Byb2plY3RcIjtcclxuaW1wb3J0IFByb2plY3RSZXBvc2l0b3J5IGZyb20gXCIuLi9tb2RlbC9Qcm9qZWN0UmVwb3NpdG9yeVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGxlciB7XHJcbiAgY29uc3RydWN0b3IodG9kb1JlcCwgcHJvalJlcCkge1xyXG4gICAgdGhpcy50b2RvUmVwID0gdG9kb1JlcDtcclxuICAgIHRoaXMucHJvalJlcCA9IHByb2pSZXA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGlmKHRoaXMucHJvalJlcC5jb250YWlucyhuYW1lKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhpcyBwcm9qZWN0IGFscmVhZHkgZXhpc3RzIScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcclxuICAgICAgdGhpcy5wcm9qUmVwLmFkZChwcm9qZWN0KTtcclxuICAgICAgcmV0dXJuIHByb2plY3Q7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIGlmKHRoaXMudG9kb1JlcC5jb250YWlucyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhpcyB0b2RvIGFscmVhZHkgZXhpc3RzIScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHRvZG8gPSBuZXcgVG9kbyhkZXNjcmlwdGlvbiwgcHJvamVjdElkKTtcclxuICAgICAgdGhpcy50b2RvUmVwLmFkZCh0b2RvKTtcclxuICAgICAgcmV0dXJuIHRvZG87XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVQcm9qZWN0KG5hbWUpIHtcclxuICAgIGlmKCF0aGlzLnByb2pSZXAuY29udGFpbnMobmFtZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IHByb2plY3QgPSB0aGlzLnByb2pSZXAuZmluZEJ5TmFtZShuYW1lKTtcclxuICAgICAgdGhpcy50b2RvUmVwLnJlbW92ZUFsbFdpdGhQcm9qZWN0SWQocHJvamVjdCk7XHJcbiAgICAgIHRoaXMucHJvalJlcC5yZW1vdmUocHJvamVjdCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGVUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIGlmKCF0aGlzLnRvZG9SZXAuY29udGFpbnMoZGVzY3JpcHRpb24sIHByb2plY3RJZCkpIHtcclxuICAgICAgY29uc29sZS5sb2coJ1RoaXMgdG9kbyBkb2VzblxcJ3QgZXhpc3QhJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdG9kbyA9IHRoaXMudG9kb1JlcC5nZXRUb2RvKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpWzBdO1xyXG4gICAgICB0aGlzLnRvZG9SZXAucmVtb3ZlKHRvZG8pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRG9uZSh0b2RvKSB7XHJcbiAgICB0b2RvLmRvbmUgPSAhdG9kby5kb25lO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiIsIi8vIHJ1bnMgdGhlIGFwcFxyXG5cclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9hcHBcIjtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgKG5ldyBBcHAoKS5ydW4oKSk7XHJcbn0pO1xyXG4iLCJpbXBvcnQgZ3VpZEdlbiBmcm9tICcuL2d1aWRHZW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuZ3VpZCA9IGd1aWRHZW4oKTtcclxuICAgIHRoaXMuY3JlYXRlZCA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdFJlcG9zaXRvcnkge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgYWRkKHByb2plY3QpIHtcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICB9XHJcblxyXG4gIGdldEFsbCgpIHtcclxuICAgIHJldHVybiBbLi4udGhpcy5wcm9qZWN0c107XHJcbiAgfVxyXG5cclxuICByZW1vdmUocHJvamVjdCkge1xyXG4gICAgdGhpcy5wcm9qZWN0cyA9IHRoaXMucHJvamVjdHMuZmlsdGVyKCBwcm9qID0+IHByb2ouZ3VpZCAhPT0gcHJvamVjdC5ndWlkKVxyXG4gIH1cclxuXHJcbiAgZmluZEJ5TmFtZShuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maWx0ZXIoIHByb2ogPT4gcHJvai5uYW1lID09PSBuYW1lKVswXTtcclxuICB9XHJcblxyXG4gIGZpbmRCeUd1aWQoZ3VpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmlsdGVyKCBwcm9qID0+IHByb2ouZ3VpZCA9PT0gZ3VpZClbMF07XHJcbiAgfVxyXG5cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICB9XHJcblxyXG4gIGNvbnRhaW5zKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbHRlciggcHJvaiA9PiBwcm9qLm5hbWUgPT09IG5hbWUgKS5sZW5ndGggPiAwO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IGd1aWRHZW4gZnJvbSAnLi9ndWlkR2VuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG8ge1xyXG4gIGNvbnN0cnVjdG9yKGRlc2NyaXB0aW9uLCBwcm9qZWN0R3VpZCkge1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdEd1aWQ7XHJcbiAgICB0aGlzLmNyZWF0ZWQgPSAobmV3IERhdGUoKSkudG9VVENTdHJpbmcoKTtcclxuICAgIHRoaXMuZ3VpZCA9IGd1aWRHZW4oKTtcclxuICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgVG9kbyBmcm9tICcuL1RvZG8nO1xyXG5cclxuY2xhc3MgVG9kb1JlcG9zaXRvcnkgeyAvLyB0b2RvcyBuZWVkIHRvIGJlIGNyZWF0ZWQgYmVmb3JlIHRoZXkgYXJlIGFkZGVkXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgfVxyXG5cclxuICBhZGQodG9kbykge1xyXG4gICAgdGhpcy50b2Rvcy5wdXNoKHRvZG8pO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWxsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9kb3MubWFwKGUgPT4gZSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmUodG9kbykge1xyXG4gICAgdGhpcy50b2RvcyA9IHRoaXMudG9kb3MuZmlsdGVyKHRkID0+IHRkLmd1aWQgIT09IHRvZG8uZ3VpZCk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBbGxXaXRoUHJvamVjdElkKHByb2plY3QpIHtcclxuICAgIGxldCBpZCA9IHByb2plY3QuZ3VpZDtcclxuICAgIHRoaXMudG9kb3MgPSB0aGlzLnRvZG9zLmZpbHRlciggdGQgPT4gdGQucHJvamVjdCAhPT0gaWQgKTtcclxuICB9XHJcblxyXG4gIGdldFRvZG8oZGVzY3JpcHRpb24sIHByb2plY3RJZCkge1xyXG4gICAgcmV0dXJuIHRoaXMudG9kb3MuZmlsdGVyKGZ1bmN0aW9uKHRkKSB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgdGQuZGVzY3JpcHRpb24gPT09IGRlc2NyaXB0aW9uXHJcbiAgICAgICAgJiYgdGQucHJvamVjdCA9PT0gcHJvamVjdElkXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZpbmRCeUluZGV4KGluZGV4KSB7XHJcbiAgICByZXR1cm4gdGhpcy50b2Rvc1tpbmRleF07XHJcbiAgfVxyXG5cclxuICBmaW5kQnlHdWlkKGd1aWQpIHtcclxuICAgIHJldHVybiB0aGlzLnRvZG9zLmZpbHRlcih0ZCA9PiB0ZC5ndWlkID09PSBndWlkKVswXTtcclxuICB9XHJcblxyXG4gIGNvbnRhaW5zKGRlc2NyaXB0aW9uLCBwcm9qZWN0SWQpIHtcclxuICAgIHJldHVybiB0aGlzLmdldFRvZG8oZGVzY3JpcHRpb24sIHByb2plY3RJZCkubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG4gIHNpemUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b2Rvcy5sZW5ndGg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb2RvUmVwb3NpdG9yeTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3VpZCgpIHtcclxuICBmdW5jdGlvbiBzNCgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgfVxyXG4gIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEb21SdW5uZXIge1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIpIHtcclxuICAgIHRoaXMuY29udHJvbGxlciA9IGNvbnRyb2xsZXI7XHJcbiAgICAvLyBsZXQgYmlrZSA9IHRoaXMuY29udHJvbGxlci5jcmVhdGVQcm9qZWN0KCdiaWtlJyk7XHJcbiAgICAvLyBsZXQgY2FyID0gdGhpcy5jb250cm9sbGVyLmNyZWF0ZVByb2plY3QoJ2NhcicpO1xyXG4gICAgLy9cclxuICAgIC8vIHRoaXMuY29udHJvbGxlci5jcmVhdGVUb2RvKCd3YXNoIHRoZScsIGJpa2UuZ3VpZCk7XHJcbiAgICAvLyB0aGlzLmNvbnRyb2xsZXIuY3JlYXRlVG9kbygnd2FzaCB0aGUgYmlnIG9sXFwnJywgY2FyLmd1aWQpO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpczsgLy9mb3IgdXNlIGluIGJ1dHRvbiBjYWxsYmFja3NcclxuXHJcbiAgICB0aGlzLmFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdEJ1dHRvbicpO1xyXG4gICAgdGhpcy5hZGRQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkUHJvamVjdElucHV0Jyk7XHJcblxyXG4gICAgdGhpcy5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLmFkZFByb2plY3QuY2FsbChzZWxmKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVQcm9qZWN0QnV0dG9uJyk7XHJcbiAgICB0aGlzLnJlbW92ZVByb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVQcm9qZWN0SW5wdXQnKTtcclxuXHJcbiAgICB0aGlzLnJlbW92ZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHNlbGYucmVtb3ZlUHJvamVjdC5jYWxsKHNlbGYpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZFRvZG9CdXR0b24nKTtcclxuICAgIHRoaXMuYWRkVG9kb0Rlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkVG9kb0Rlc2NyaXB0aW9uSW5wdXQnKTtcclxuICAgIHRoaXMuYWRkVG9kb1Byb2plY3RJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRUb2RvUHJvamVjdElucHV0Jyk7XHJcblxyXG4gICAgdGhpcy5hZGRUb2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBzZWxmLmFkZFRvZG8uY2FsbChzZWxmKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlVG9kb0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVUb2RvQnV0dG9uJyk7XHJcbiAgICB0aGlzLnJlbW92ZVRvZG9EZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZVRvZG9EZXNjcmlwdGlvbklucHV0Jyk7XHJcbiAgICB0aGlzLnJlbW92ZVRvZG9Qcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlVG9kb1Byb2plY3RJbnB1dCcpO1xyXG5cclxuICAgIHRoaXMucmVtb3ZlVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gc2VsZi5yZW1vdmVUb2RvLmNhbGwoc2VsZik7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgc2hvd1RvZG9zKCkge1xyXG4gICAgdmFyIHRvZG9UYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvVGFibGUnKTtcclxuICAgIHZhciB0YWJsZUhUTUwgPSAnJztcclxuICAgIHRhYmxlSFRNTCArPSBgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aD5Ub2RvPC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGg+UHJvamVjdDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoPkRvbmU8L3RoPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPmA7XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIudG9kb1JlcC50b2Rvcy5mb3JFYWNoKHRvZG8gPT4ge1xyXG4gICAgICB0YWJsZUhUTUwgKz0gYDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RvZG8uZGVzY3JpcHRpb259PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3RoaXMuY29udHJvbGxlci5wcm9qUmVwLmZpbmRCeUd1aWQodG9kby5wcm9qZWN0KS5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHt0b2RvLmRvbmUgPyBcInllc1wiIDogXCJub1wifTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBjbGFzcz1cImNoZWNrQnV0dG9uXCIgZGF0YS1ndWlkPVwiJHt0b2RvLmd1aWR9XCI+Q2hlY2s8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+YDtcclxuICAgIH0pO1xyXG4gICAgdG9kb1RhYmxlLmlubmVySFRNTCA9IHRhYmxlSFRNTDtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGxldCBjaGVja0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tCdXR0b24nKTtcclxuICAgIGNoZWNrQnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0b2RvID0gc2VsZi5jb250cm9sbGVyLnRvZG9SZXAuZmluZEJ5R3VpZCh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1ndWlkJykpO1xyXG4gICAgICAgIHNlbGYuY29udHJvbGxlci50b2dnbGVEb25lKHRvZG8pO1xyXG4gICAgICAgIHNlbGYuc2hvd1RvZG9zKCk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYWRkUHJvamVjdCgpIHtcclxuICAgIGxldCBhZGRQcm9qZWN0QnV0dG9uID0gdGhpcy5hZGRQcm9qZWN0QnV0dG9uO1xyXG4gICAgbGV0IGFkZFByb2plY3RJbnB1dCA9IHRoaXMuYWRkUHJvamVjdElucHV0O1xyXG5cclxuICAgIGlmKCFhZGRQcm9qZWN0SW5wdXQudmFsdWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ZpbGwgb3V0IHRoZSBmaWVsZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb250cm9sbGVyLmNyZWF0ZVByb2plY3QoYWRkUHJvamVjdElucHV0LnZhbHVlKTtcclxuICAgICAgYWRkUHJvamVjdElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hvd1RvZG9zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVQcm9qZWN0KCkge1xyXG4gICAgbGV0IHJlbW92ZVByb2plY3RCdXR0b24gPSB0aGlzLnJlbW92ZVByb2plY3RCdXR0b247XHJcbiAgICBsZXQgcmVtb3ZlUHJvamVjdElucHV0ID0gdGhpcy5yZW1vdmVQcm9qZWN0SW5wdXQ7XHJcblxyXG4gICAgaWYoIXJlbW92ZVByb2plY3RJbnB1dC52YWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnRmlsbCBvdXQgdGhlIGZpZWxkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbnRyb2xsZXIuZGVsZXRlUHJvamVjdChyZW1vdmVQcm9qZWN0SW5wdXQudmFsdWUpO1xyXG4gICAgICByZW1vdmVQcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgdGhpcy5zaG93VG9kb3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFRvZG8oKSB7XHJcbiAgICBsZXQgYWRkVG9kb0J1dHRvbiA9IHRoaXMuYWRkVG9kb0J1dHRvbjtcclxuICAgIGxldCBhZGRUb2RvRGVzY3JpcHRpb25JbnB1dCA9IHRoaXMuYWRkVG9kb0Rlc2NyaXB0aW9uSW5wdXQ7XHJcbiAgICBsZXQgYWRkVG9kb1Byb2plY3RJbnB1dCA9IHRoaXMuYWRkVG9kb1Byb2plY3RJbnB1dDtcclxuXHJcbiAgICBpZighYWRkVG9kb0Rlc2NyaXB0aW9uSW5wdXQudmFsdWUgfHwgIWFkZFRvZG9Qcm9qZWN0SW5wdXQudmFsdWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0ZpbGwgb3V0IHRoZSBmaWVsZCcpO1xyXG4gICAgfSBlbHNlIGlmKCF0aGlzLmNvbnRyb2xsZXIucHJvalJlcC5jb250YWlucyhhZGRUb2RvUHJvamVjdElucHV0LnZhbHVlKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnVGhhdCBwcm9qZWN0IGRvZXNuXFwndCBleGlzdCEnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udHJvbGxlci5jcmVhdGVUb2RvKFxyXG4gICAgICAgIGFkZFRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlLFxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlci5wcm9qUmVwLmZpbmRCeU5hbWUoYWRkVG9kb1Byb2plY3RJbnB1dC52YWx1ZSkuZ3VpZFxyXG4gICAgICApO1xyXG4gICAgICBhZGRUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICBhZGRUb2RvUHJvamVjdElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hvd1RvZG9zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW1vdmVUb2RvKCkge1xyXG4gICAgbGV0IHJlbW92ZVRvZG9CdXR0b24gPSB0aGlzLnJlbW92ZVRvZG9CdXR0b247XHJcbiAgICBsZXQgcmVtb3ZlVG9kb0Rlc2NyaXB0aW9uSW5wdXQgPSB0aGlzLnJlbW92ZVRvZG9EZXNjcmlwdGlvbklucHV0O1xyXG4gICAgbGV0IHJlbW92ZVRvZG9Qcm9qZWN0SW5wdXQgPSB0aGlzLnJlbW92ZVRvZG9Qcm9qZWN0SW5wdXQ7XHJcblxyXG4gICAgaWYoIXJlbW92ZVRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlIHx8ICFyZW1vdmVUb2RvUHJvamVjdElucHV0LnZhbHVlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdGaWxsIG91dCB0aGUgZmllbGQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29udHJvbGxlci5kZWxldGVUb2RvKFxyXG4gICAgICAgIHJlbW92ZVRvZG9EZXNjcmlwdGlvbklucHV0LnZhbHVlLFxyXG4gICAgICAgIHRoaXMuY29udHJvbGxlci5wcm9qUmVwLmZpbmRCeU5hbWUocmVtb3ZlVG9kb1Byb2plY3RJbnB1dC52YWx1ZSkuZ3VpZFxyXG4gICAgICApO1xyXG4gICAgICByZW1vdmVUb2RvRGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICByZW1vdmVUb2RvUHJvamVjdElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hvd1RvZG9zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBydW4oKSB7XHJcbiAgICB0aGlzLnNob3dUb2RvcygpO1xyXG4gIH1cclxufVxyXG4iXX0=
