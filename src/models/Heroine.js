import Package from "./Package";
import WeatherController from "../controllers/WeatherController";
import TimeController from "../controllers/TimeController";

import activity from "../data/activity";
import { ItemTypes } from "./Items/Item";

import EventEmitter from "events";

export const HealthStates = {
  FINE: "FINE",
  SICK: "SICK"
};

export const ActivityStates = {
  ATHOME: "atHome",
  HANGOUT: "hangOut",
  HUNTING: "hunting",
  FINDING: "finding",
  ATMARKET: "market"
};

export const HEROINE_EVENT_NAMES = {
  UPDATE_ACTIVITY_STATE: 'updateActivity',
}

export default class Heroine {
  constructor(name) {
    this.name = name;
    this.reputation = 0;
    this.health = 100;
    this.food = 100;
    this.package = new Package(Number.POSITIVE_INFINITY);
    this.activityState = "";

    this._eventEmitter = new EventEmitter();

    this._bindTime();
    this._init();
  }

  _init() {
    this.changeActivity(ActivityStates.ATHOME);
  }

  _bindTime() {
    TimeController.onWholeMinute(this._activityIsGoodForHealth.bind(this));
  }

  addEventListener(evt, fn) {
    this._eventEmitter.on(evt, fn);
  }

  changeActivity(stateName) {
    if (!Object.values(ActivityStates).includes(stateName)) {
      return;
    }
    this.activityState = stateName;
    this._eventEmitter.emit(HEROINE_EVENT_NAMES.UPDATE_ACTIVITY_STATE, this.activityState);
  }

  _activityIsGoodForHealth() {
    const damageData = activity.damageHealthAndFood[this.activityState];
    if (damageData && damageData.length === 2) {
      const totalHealthDamage =
        damageData[0] *
        (WeatherController.rainRate * 5 + WeatherController.windRate * 3 + 0.6);
      const totalFoodDamage =
        damageData[1] *
        (WeatherController.rainRate * 5 + WeatherController.windRate * 3 + 0.6);
      this.badForHealth(totalHealthDamage);
      this.makeMeHungry(totalFoodDamage);
    }
  }

  collectObjectToCarry(item) {
    return this.package.put(item);
  }

  updateName(newName) {
    this.name = newName;
  }

  eatFood(itemId, amount) {
    const packageItem = this.package.find(itemId);
    if (!packageItem) {
      return false;
    }
    if (packageItem.item.type !== ItemTypes.FOOD) {
      return false;
    }
    const usedItem = this.package.use(itemId, amount);
    const totalTypeValue = usedItem.item.typeValue * usedItem.amount;
    this.makeMeHungry(0 - totalTypeValue);
    return true;
  }

  dropItem(itemId, amount) {
    return this.package.use(itemId, amount);
  }

  /**
   *
   * @param {number} val if val < 0, then it's good for health
   */
  badForHealth(val) {
    this.health -= val;
    this.health = this.health >= 0 ? this.health : 0;
    this.health = this.health <= 100 ? this.health : 100;
  }

  makeMeHungry(val) {
    this.food -= val;
    this.food = this.food >= 0 ? this.food : 0;
    this.food = this.food <= 100 ? this.food : 100;
  }
}
