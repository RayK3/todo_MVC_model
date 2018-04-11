import Todo from "../model/Todo";
import TodoRepository from "../model/TodoRepository";
import Project from "../model/Project";
import ProjectRepository from "../model/ProjectRepository";

export default class Controller {
  constructor(todoRep, projRep) {
    this.todoRep = todoRep;
    this.projRep = projRep;
  }

  postRequest() {
    var projects = this.projRep.projects;
    var todos = this.todoRep.todos;

    projects = JSON.stringify(projects);
    todos = JSON.stringify(todos);

    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:8001/create";
    var params = `projects=${projects}&todos=${todos}`;
    xhttp.open("POST", url, true);

    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhttp.onreadystatechange = function() {
      if(this.readystate == 4 && this.status == 200) {
        console.log('Sent the new objects');
      }
    }
    xhttp.send(params);
  }

  createProject(name) {
    if(this.projRep.contains(name)) {
      console.log('This project already exists!');
    } else {
      let project = new Project(name);
      this.projRep.add(project);
      return project;
    }
  }

  createTodo(description, projectId) {
    if(this.todoRep.contains(description, projectId)) {
      console.log('This todo already exists!');
    } else {
      let todo = new Todo(description, projectId);
      this.todoRep.add(todo);
      return todo;
    }
  }

  deleteProject(name) {
    if(!this.projRep.contains(name)) {
      return;
    } else {
      let project = this.projRep.findByName(name);
      this.todoRep.removeAllWithProjectId(project);
      this.projRep.remove(project);
    }
  }

  deleteTodo(description, projectId) {
    if(!this.todoRep.contains(description, projectId)) {
      console.log('This todo doesn\'t exist!');
    } else {
      let todo = this.todoRep.getTodo(description, projectId)[0];
      this.todoRep.remove(todo);
    }
  }

  toggleDone(todo) {
    todo.done = !todo.done;
  }


}
