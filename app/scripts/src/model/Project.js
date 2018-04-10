import guidGen from './guidGen';

export default class Project {
  constructor(name) {
    this.name = name;
    this.guid = guidGen();
    this.created = (new Date()).toUTCString();
  }
}
