export default class DomRunner {
  constructor(controller) {
    this.controller = controller;
    // let bike = this.controller.createProject('bike');
    // let car = this.controller.createProject('car');
    //
    // this.controller.createTodo('wash the', bike.guid);
    // this.controller.createTodo('wash the big ol\'', car.guid);

    var self = this; //for use in button callbacks

    this.addProjectButton = document.getElementById('addProjectButton');
    this.addProjectInput = document.getElementById('addProjectInput');

    this.addProjectButton.addEventListener('click', function() {
      return self.addProject.call(self);
    });

    this.removeProjectButton = document.getElementById('removeProjectButton');
    this.removeProjectInput = document.getElementById('removeProjectInput');

    this.removeProjectButton.addEventListener('click', function() {
      return self.removeProject.call(self);
    });

    this.addTodoButton = document.getElementById('addTodoButton');
    this.addTodoDescriptionInput = document.getElementById('addTodoDescriptionInput');
    this.addTodoProjectInput = document.getElementById('addTodoProjectInput');

    this.addTodoButton.addEventListener('click', function() {
      return self.addTodo.call(self);
    });

    this.removeTodoButton = document.getElementById('removeTodoButton');
    this.removeTodoDescriptionInput = document.getElementById('removeTodoDescriptionInput');
    this.removeTodoProjectInput = document.getElementById('removeTodoProjectInput');

    this.removeTodoButton.addEventListener('click', function() {
      return self.removeTodo.call(self);
    })
  }

  showTodos(firstCall) {
    var todoTable = document.getElementById('todoTable');
    var tableHTML = '';
    tableHTML += `<tr>
                    <th>Todo</th>
                    <th>Project</th>
                    <th>Done</th>
                  </tr>`;
    this.controller.todoRep.todos.forEach(todo => {
      tableHTML += `<tr>
                      <td>${todo.description}</td>
                      <td>${this.controller.projRep.findByGuid(todo.project).name}</td>
                      <td>${todo.done ? "yes" : "no"}</td>
                      <td><button class="checkButton" data-guid="${todo.guid}">Check</button></td>
                    </tr>`;
    });
    todoTable.innerHTML = tableHTML;
    var self = this;
    let checkButtons = document.querySelectorAll('.checkButton');
    checkButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        var todo = self.controller.todoRep.findByGuid(this.getAttribute('data-guid'));
        self.controller.toggleDone(todo);
        self.showTodos(false);
      });
    });
    if(!firstCall) {
      this.controller.postRequest();
    }
  }

  addProject() {
    let addProjectButton = this.addProjectButton;
    let addProjectInput = this.addProjectInput;

    if(!addProjectInput.value) {
      console.log('Fill out the field');
    } else {
      this.controller.createProject(addProjectInput.value);
      addProjectInput.value = '';
      this.showTodos(false);
    }
  }

  removeProject() {
    let removeProjectButton = this.removeProjectButton;
    let removeProjectInput = this.removeProjectInput;

    if(!removeProjectInput.value) {
      console.log('Fill out the field');
    } else {
      this.controller.deleteProject(removeProjectInput.value);
      removeProjectInput.value = '';
      this.showTodos(false);
    }
  }

  addTodo() {
    let addTodoButton = this.addTodoButton;
    let addTodoDescriptionInput = this.addTodoDescriptionInput;
    let addTodoProjectInput = this.addTodoProjectInput;

    if(!addTodoDescriptionInput.value || !addTodoProjectInput.value) {
      console.log('Fill out the field');
    } else if(!this.controller.projRep.contains(addTodoProjectInput.value)) {
      console.log('That project doesn\'t exist!');
    } else {
      this.controller.createTodo(
        addTodoDescriptionInput.value,
        this.controller.projRep.findByName(addTodoProjectInput.value).guid
      );
      addTodoDescriptionInput.value = '';
      addTodoProjectInput.value = '';
      this.showTodos(false);
    }
  }

  removeTodo() {
    let removeTodoButton = this.removeTodoButton;
    let removeTodoDescriptionInput = this.removeTodoDescriptionInput;
    let removeTodoProjectInput = this.removeTodoProjectInput;

    if(!removeTodoDescriptionInput.value || !removeTodoProjectInput.value) {
      console.log('Fill out the field');
    } else {
      this.controller.deleteTodo(
        removeTodoDescriptionInput.value,
        this.controller.projRep.findByName(removeTodoProjectInput.value).guid
      );
      removeTodoDescriptionInput.value = '';
      removeTodoProjectInput.value = '';
      this.showTodos(false);
    }
  }

  run() {
    this.showTodos(true);
  }
}
