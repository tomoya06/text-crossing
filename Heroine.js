import Package from './Package';

export default class Heroine {
  constructor(name) {
    this.name = name;
    this.reputation = 0;
    this.health = 100;
    this.package = new Package(1000);
  }
}