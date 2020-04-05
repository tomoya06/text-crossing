import Heroine, {
  ActivityStates,
  HEROINE_EVENT_NAMES,
} from "../models/Heroine";
import WorldController from "./WorldController";
import SimpleHouse from "../models/Houses/SimpleHouse";

import EventEmitter from "events";
import { Promise } from "bluebird";

export const OUTDOOR_ACTIVITY_TYPE = {
  HUNTING: "goHunting",
  FINDING: "goFindingMaterial",
};

export const HEROINE_EVENTS = {
  START_FINDIND: "startFinding",
  FOUNDED: "founded",
  CONFIRM_FOUNDED: "confirmCollect",
  FINISHED_FINDING: "finishFinding",
};

class HeroineController {
  constructor() {
    this.heroine = null;
    this.house = null;

    this._eventEmitter = new EventEmitter();
    // this._foundItem = null;

    this.init();
  }

  init() {}

  createHeroine(name, houseName) {
    if (this.heroine === null) {
      this.heroine = new Heroine(name);
      this.house = new SimpleHouse(houseName);
      return true;
    }
    return false;
  }

  // confirmFounded(flag) {
  //   this._handleConfirmFounded(flag);
  // }

  addEventListener(evt, fn) {
    this._eventEmitter.on(evt, fn);
  }

  goHome() {
    this.heroine.changeActivity(ActivityStates.ATHOME);
  }

  eatFood(itemId, amount) {
    this.heroine.eatFood(itemId, amount);
  }

  changeActivity(activityState) {
    this.heroine.changeActivity(activityState);
  }

  triggerActivityEvent(activityType) {
    return this._triggerOutDoorActivity(activityType);
  }

  collectItem(item, amount = 1) {
    this.heroine.package.put(item, amount);
    this._eventEmitter.emit(HEROINE_EVENTS.FOUNDED, {
      item,
      amount,
    });
  }

  // triggerGoHunting() {
  //   this.heroine.changeActivity(ActivityStates.HUNTING);
  //   this._triggerOutDoorActivity(OUTDOOR_ACTIVITY_TYPE.HUNTING);
  // }

  // triggerGoFinding() {
  //   this.heroine.changeActivity(ActivityStates.FINDING);
  //   this._triggerOutDoorActivity(OUTDOOR_ACTIVITY_TYPE.FINDING);
  // }

  onActivityStateChange(fn) {
    this.heroine.addEventListener(
      HEROINE_EVENT_NAMES.UPDATE_ACTIVITY_STATE,
      fn
    );
  }

  _triggerOutDoorActivity(type) {
    if (!type || typeof WorldController[type] !== "function") {
      this._eventEmitter.emit(HEROINE_EVENTS.FOUNDED, null);
      this._eventEmitter.emit(HEROINE_EVENTS.FINISHED_FINDING);
      return Promise.reject(new Error("NO SUCH ACTIVITY"));
    }
    return WorldController[type]();
  }

  // _handleConfirmFounded(confirm) {
  //   let confirmResult = null;
  //   if (this._foundItem && confirm) {
  //     confirmResult = this.heroine.collectObjectToCarry(this._foundItem);
  //   }
  //   this._foundItem = null;
  //   this._eventEmitter.emit(HEROINE_EVENTS.FINISHED_FINDING, confirmResult);
  // }
}

export default new HeroineController();
