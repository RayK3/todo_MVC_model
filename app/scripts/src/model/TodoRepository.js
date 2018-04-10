import Todo from './Todo';

class TodoRepository { // todos need to be created before they are added
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  getAll() {
    return this.todos.map(e => e);
  }

  remove(todo) {
    this.todos = this.todos.filter(td => td.guid !== todo.guid);
  }

  removeAllWithProjectId(project) {
    let id = project.guid;
    this.todos = this.todos.filter( td => td.project !== id );
  }

  getTodo(description, projectId) {
    return this.todos.filter(function(td) {
      return (
        td.description === description
        && td.project === projectId
      );
    });
  }

  findByIndex(index) {
    return this.todos[index];
  }

  findByGuid(guid) {
    return this.todos.filter(td => td.guid === guid)[0];
  }

  contains(description, projectId) {
    return this.getTodo(description, projectId).length > 0;
  }

  size() {
    return this.todos.length;
  }
}

export default TodoRepository;
