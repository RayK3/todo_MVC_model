import guidGen from './guidGen';

export default class Todo {
  constructor(description, projectGuid) {
    this.description = description;
    this.project = projectGuid;
    this.created = (new Date()).toUTCString();
    this.guid = guidGen();
    this.done = false;
  }
}
