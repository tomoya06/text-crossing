import Island from "../models/Island";
import TimeController from "./TimeController";
import "./WeatherController";

class WorldController {
  constructor() {
    this.island = new Island();

    this.init();
  }

  init() {
    TimeController.onTimeChange(tm => {
      console.log(tm.format("hh:mm:ss"));
    });
  }
}

export default new WorldController();
