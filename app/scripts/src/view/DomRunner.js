export default class DomRunner {
  constructor(controller) {
    this.controller = controller;

    var self = this; //for use in button callbacks

    this.addProjectButton = document.getElementById('addProjectButton');
    this.addProjectInput = document.getElementById('addProjectInput');

    this.addProjectButton.addEventListener('click', function() {
      return self.addProject.call(self);
    });

  }

  showTodos() {
    var projects = this.controller.projRep.getAll();
    var container = document.getElementById('container');
    container.innerHTML = '';

    projects.forEach(project => {
      var todos = this.controller.todoRep.getAllWithProjectId(project);
      var div = document.createElement("DIV");
      var title = document.createElement("H1");
      title.innerHTML = `${project.name}`;

      var todoTable = document.createElement("TABLE");

      var addTodo = document.createElement("DIV");
      addTodo.setAttribute("id", `addTodo${project.guid}`);

      var addTodoButton = document.createElement("BUTTON");
      addTodoButton.setAttribute("id", `addTodoButton${project.guid}`);
      addTodoButton.innerHTML = 'Add Todo';

      var addTodoInput = document.createElement("INPUT");
      addTodoInput.setAttribute("type", "text");
      addTodoInput.setAttribute("placeholder", "description");
      addTodoInput.setAttribute("id", `addTodoInput${project.guid}`);

      var removeProjectButton = document.createElement("BUTTON");
      removeProjectButton.setAttribute("id", `removeProjectButton${project.guid}`);
      removeProjectButton.setAttribute("class", 'removeProjectButton');
      removeProjectButton.innerHTML = 'Remove Project';


      var tableHTML = '';
      tableHTML += `<tr>
                      <th>Todo</th>
                      <th>Done</th>
                    </tr>`;
      todos.forEach(todo => {
        tableHTML += `<tr>
                        <td>${todo.description}</td>
                        <td>${todo.done ? "yes" : "no"}</td>
                        <td><button id="check${todo.guid}" class="checkButton" data-guid="${todo.guid}">Check</button></td>
                        <td><button id="remove${todo.guid}" class="removeButton" data-guid="${todo.guid}">Remove</button></td>
                      </tr>`;
      });
      todoTable.innerHTML = tableHTML;

      var self = this;
      let checkButtons = todoTable.querySelectorAll('.checkButton');
      checkButtons.forEach(button => {
        button.addEventListener('click', function() {
          var todo = self.controller.todoRep.findByGuid(this.getAttribute('data-guid'));
          self.controller.toggleDone(todo);
          self.showTodos();
          self.controller.postRequest();
        });
      });
      let removeButtons = todoTable.querySelectorAll('.removeButton');
      removeButtons.forEach(button => {
        button.addEventListener('click', function() {
          var guid = this.getAttribute('data-guid');
          var todo = self.controller.todoRep.findByGuid(guid);
          self.controller.deleteTodo(todo.description, todo.project);
          self.showTodos();
          self.controller.postRequest();
        });
      });

      addTodoButton.addEventListener('click', function() {
        self.addTodo(addTodoInput, project.guid);
      });

      removeProjectButton.addEventListener('click', function() {
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

  addProject() {
    let addProjectButton = this.addProjectButton;
    let addProjectInput = this.addProjectInput;

    if(!addProjectInput.value) {
      console.log('Fill out the field');
    } else {
      this.controller.createProject(addProjectInput.value);
      addProjectInput.value = '';

      this.showTodos();
      this.controller.postRequest();
    }
  }

  removeProject(name) {
    if(!name) {
      console.log('Fill out the field');
    } else {
      this.controller.deleteProject(name);

      this.showTodos();
      this.controller.postRequest();
    }
  }

  addTodo(addTodoInput, projectGuid) {
    if(!addTodoInput.value) {
      console.log('Fill out the field');
    } else {
      this.controller.createTodo(
        addTodoInput.value,
        projectGuid
      );
      addTodoInput.value = '';

      this.showTodos();
      this.controller.postRequest();
    }
  }

  run() {
    this.showTodos();
  }
}
