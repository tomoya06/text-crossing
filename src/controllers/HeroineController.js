import Heroine from "../models/Heroine";
// import WorldController from './WorldController';


class HeroineController {
  constructor() {
    this.heroine = null;
  }

  createHeroine(name) {
    if (this.heroine === null) {
      this.heroine = new Heroine(name);
      return true;
    }
    return false;
  }

  giveupHeroine() {
    if (this.heroine !== null) {
      this.heroine = null;
      return true;
    }
    return false;
  }
}

export default new HeroineController();
