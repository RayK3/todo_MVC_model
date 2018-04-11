import Project from './Project';

export default class ProjectRepository {
  constructor() {
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:8001/projects";
    var self = this;

    xhttp.open("GET", url, false);

    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        if(!this.responseText) {
          self.projects = [];
        } else {
          var data = JSON.parse(this.responseText);
          self.projects = data;
        }
      }
    }
    xhttp.send();
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
