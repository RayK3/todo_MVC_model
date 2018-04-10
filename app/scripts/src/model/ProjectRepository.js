import Project from './Project';

export default class ProjectRepository {
  constructor() {
    this.projects = [];
  }

  add(project) {
    this.projects.push(project);
  }

  getAll() {
    return [...this.projects];
  }

  remove(project) {
    this.projects = this.projects.filter( proj => proj.guid !== project.guid)
  }

  findByName(name) {
    return this.projects.filter( proj => proj.name === name)[0];
  }

  findByGuid(guid) {
    return this.projects.filter( proj => proj.guid === guid)[0];
  }

  clear() {
    this.projects = [];
  }

  contains(name) {
    return this.projects.filter( proj => proj.name === name ).length > 0;
  }

}
