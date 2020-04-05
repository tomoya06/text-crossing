import Island from "../models/Island";

import Random from "../utils/Random";

import foundRate from "../data/foundRate";
import activity from "../data/activity";

import AllFood from "../models/Items/FOOD";
import AllHouse from "../models/Items/HOUSE";

import HeroineController from "./HeroineController";
import "./WeatherController";

import * as Promise from "bluebird";

class WorldController {
  constructor() {
    this.island = new Island("MY ISLAND");
    HeroineController.createHeroine("NOBODY", "MY HOUSE");
  }

  goHunting() {
    return this._goHunting().then((result) => {
      if (result) {
        HeroineController.collectItem(result);
        return Promise.resolve({
          item: result,
          amount: 1,
        });
      } else {
        return Promise.reject(new Error("FOUND NOTHING"));
      }
    });
  }

  goFindingMaterial() {
    return this._goFindingMaterial().then((result) => {
      if (result) {
        HeroineController.collectItem(result);
        return Promise.resolve({
          item: result,
          amount: 1,
        });
      } else {
        return Promise.reject(new Error("FOUND NOTHING"));
      }
    });
  }

  _goHunting() {
    const tm = this._waitingTime();
    return Promise.delay(tm).then(() => {
      const allFoods = Object.keys(foundRate.food);
      allFoods.push(null);
      const pickedFood = Random.pickOneItem(allFoods);
      if (!pickedFood) return Promise.resolve(null);
      const rate = foundRate.food[pickedFood];
      if (Random.bool(rate) && AllFood[pickedFood]) {
        return Promise.resolve(new AllFood[pickedFood]());
      }
      return Promise.resolve(null);
    });
  }

  _goFindingMaterial() {
    const tm = this._waitingTime();
    return Promise.delay(tm).then(() => {
      const allHouses = Object.keys(foundRate.house);
      allHouses.push(null);
      const pickedHouseMaterial = Random.pickOneItem(allHouses);
      if (!pickedHouseMaterial) return Promise.resolve(null);
      const rate = foundRate.house[pickedHouseMaterial];
      if (Random.bool(rate) && AllHouse[pickedHouseMaterial]) {
        return Promise.resolve(new AllHouse[pickedHouseMaterial]());
      }
      return Promise.resolve(null);
    });
  }

  _waitingTime() {
    return Math.random() * Random.pickOneItem(activity.huntingWaitingTime);
  }
}

export default new WorldController();
