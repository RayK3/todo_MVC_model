import Todo from "./model/Todo";
import TodoRepository from "./model/TodoRepository";
import Project from "./model/Project";
import ProjectRepository from "./model/ProjectRepository";
import Controller from "./controller/Controller";
import DomRunner from "./view/DomRunner";

export default class App {
  constructor() {
    this.todoRep = new TodoRepository();
    this.projRep = new ProjectRepository();
    this.controller = new Controller(this.todoRep, this.projRep);
    this.domRunner = new DomRunner(this.controller);
  }

  run() {
    this.domRunner.run();
  }
}
