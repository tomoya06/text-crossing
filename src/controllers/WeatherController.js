import TimeController from "./TimeController";
import MathWorks from "../utils/MathWorks";

import EventEmitter from "events";

const EVENT_NAMES = {
  WEATHER_UPDATE: "weatherUpdate",
};

// const WEATHER_CHANGE_HOUR = [9, 15, 21, 3];

export const WEATHER_STATES = {
  SUNNY: "sunny",
  RAIN: "rain",
  HEAVY_RAIN: "heavy rain",
  STORM: "storm"
};

class WeatherController {
  constructor() {
    this.init();

    this.weatherState = WEATHER_STATES.SUNNY;
    this.todayRainingRate = 0.1;
    this.rainRate = 0;
    this.windRate = 0;

    this._timeEmitter = new EventEmitter();
  }

  init() {
    TimeController.onWholeClock(() => {
      this.updateWeather();
    });
  }

  onWeatherChange(fn) {
    this._timeEmitter.on(EVENT_NAMES.WEATHER_UPDATE, fn);
  }

  updateWeather() {
    this.rainRate = MathWorks.powRate(1, this.todayRainingRate, 0.1);
    this.windRate = MathWorks.powRate(1, 0.2, 0.1);
    this._updateWeatherState();
    this._timeEmitter.emit(EVENT_NAMES.WEATHER_UPDATE, {
      rainRate: this.rainRate,
      windRate: this.windRate,
      weatherState: this.weatherState,
    })
  }

  _updateWeatherState() {
    if (this.rainRate === 0) {
      this.weatherState = WEATHER_STATES.SUNNY;
    } else if (this.rainRate < 0.2) {
      this.weatherState = WEATHER_STATES.RAIN;
    } else if (this.rainRate < 0.5) {
      this.weatherState = WEATHER_STATES.HEAVY_RAIN;
    } else {
      this.weatherState = WEATHER_STATES.STORM;
    }
  }
}

export default new WeatherController();
