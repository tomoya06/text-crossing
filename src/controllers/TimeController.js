import moment from "moment";
import EventEmitter from "events";

const TIMECTRL_EVENT_NAMES = {
  TIME_CHANGE: "timeChange",
  WHOLE_MINUTE: "wholeMinute",
  WHOLE_CLOCK: "wholeClock",
  NEW_DAY: "newDay"
};

/**
 * Callback for time update
 *
 * @callback timeCallback
 * @param {moment.Moment} tm
 */

class TimeController {
  constructor() {
    this.time = moment("2004-01-01 09:00:00");
    this.speed = 60 * 10;

    this._timeEmitter = new EventEmitter();
    this._startTime();

    this._destructor();
  }

  /**
   *
   * @param {timeCallback} fn
   */
  onTimeChange(fn) {
    this._timeEmitter.on(TIMECTRL_EVENT_NAMES.TIME_CHANGE, fn);
  }

  /**
   *
   * @param {timeCallback} fn
   */
  onWholeClock(fn) {
    this._timeEmitter.on(TIMECTRL_EVENT_NAMES.WHOLE_CLOCK, fn);
  }
  
  /**
   *
   * @param {timeCallback} fn
   */
  onWholeMinute(fn) {
    this._timeEmitter.on(TIMECTRL_EVENT_NAMES.WHOLE_MINUTE, fn);
  }

  _startTime() {
    const timeTask = () => {
      const lastTime = this.time.clone();
      this.time.add(this.speed, "s");
      this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.TIME_CHANGE, this.time);

      if (lastTime.hour() !== this.time.hour()) {
        this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.WHOLE_CLOCK, this.time);
      }

      if (lastTime.date() !== this.time.date()) {
        this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.NEW_DAY, this.time);
      }

      if (lastTime.minute() !== this.time.minute()) {
        this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.WHOLE_MINUTE, this.time);
      }
    };
    this.timeInterval = setInterval(timeTask, 100);
  }

  _destructor() {
    window.addEventListener("beforeunload", () => {
      clearInterval(this.timeInterval);
    });
  }
}

export default new TimeController();
