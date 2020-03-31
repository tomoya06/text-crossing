import Heroine from "../models/Heroine";
import WorldController from './WorldController';
import SimpleHouse from "../models/Houses/SimpleHouse";

class HeroineController {
  constructor() {
    this.heroine = null;
    this.house = null;
  }

  createHeroine(name, houseName) {
    if (this.heroine === null) {
      this.heroine = new Heroine(name);
      this.house = new SimpleHouse(houseName);
      return true;
    }
    return false;
  }

  giveupHeroine() {
    if (this.heroine !== null) {
      this.heroine = null;
      this.house = null;
      return true;
    }
    return false;
  }

  triggerHunt() {
    const huntResult = WorldController.huntResult();
    return Promise.resolve(huntResult);
  }

  triggerFindHouse() {
    const findResult = WorldController.findHouseResult();
    return Promise.resolve(findResult);
  }
}

export default new HeroineController();
