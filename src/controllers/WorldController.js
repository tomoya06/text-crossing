import Island from "../models/Island";
import TimeController from "./TimeController";
import WeatherController from "./WeatherController";

import Random from '../utils/Random';

import foundRate from '../data/foundRate';

import AllFood from '../models/Items/FOOD';
import AllHouse from '../models/Items/HOUSE';

class WorldController {
  constructor() {
    this.island = new Island();

    this.init();
  }

  init() {
    TimeController.onTimeChange(tm => {
      console.log(tm.format("hh:mm:ss"));
    });
    WeatherController.onWeatherChange(wt => {
      console.log(`weather update: ${JSON.stringify(wt)}`);
    });
  }

  huntResult() {
    const allFoods = Object.keys(foundRate.food);
    allFoods.push(null);
    const pickedFood = Random.pickOneItem(allFoods);
    if (!pickedFood) return pickedFood;
    const rate = foundRate.food[pickedFood];
    if (Random.bool(rate) && AllFood[pickedFood]) {
      return new AllFood[pickedFood];
    }
    return null;
  }
  
  findHouseResult() {
    const allHouses = Object.keys(foundRate.house);
    allHouses.push(null);
    const pickedHouseMaterial = Random.pickOneItem(allHouses);
    if (!pickedHouseMaterial) return pickedHouseMaterial;
    const rate = foundRate.house[pickedHouseMaterial];
    if (Random.bool(rate) && AllHouse[pickedHouseMaterial]) {
      return new AllHouse[pickedHouseMaterial];
    }
    return null;
  }
}

export default new WorldController();
