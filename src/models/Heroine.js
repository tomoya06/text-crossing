import Package from "./Package";
import WeatherController, {
  WEATHER_STATES
} from "../controllers/WeatherController";
import TimeController from "../controllers/TimeController";

export const HealthStates = {
  FINE: "FINE",
  SICK: "SICK"
};

export const ActivityStates = {
  ATHOME: "atHome",
  HANGOUT: "hangOut",
  HUNTING: "hunting",
  FINDING: "finding"
};

export default class Heroine {
  constructor(name) {
    this.name = name;
    this.reputation = 0;
    this.health = 100;
    this.food = 100;
    this.package = new Package(1000);
    this.activityState = ActivityStates.ATHOME;

    this._bindWeather();
    this._bindTime();
  }

  _bindWeather() {
    WeatherController.onWeatherChange(this._weatherDamageHealth);
  }

  _bindTime() {
    TimeController.onWholeMinute(this.activityIsGoodForHealth);
  }

  _weatherDamageHealth(wt) {
    if (wt.rainRate > 0.2 && this.activityState !== ActivityStates.ATHOME) {
      this.badForHealth(2);
    }
    if (wt.weatherState === WEATHER_STATES.SUNNY) {
      this.badForHealth(-1);
    }
  }

  changeActivity(stateName) {
    if (!Object.values(ActivityStates).includes(stateName)) {
      return;
    }
    this.activityState = stateName;
  }

  activityIsGoodForHealth() {
    switch (this.activityState) {
      case ActivityStates.ATHOME:
        this.badForHealth(-0.2);
        break;
      case ActivityStates.HANGOUT:
        this.badForHealth(0);
        break;
      default:
        this.badForHealth(0.1);
        this.makeMeHungry(0.1);
        break;
    }
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
