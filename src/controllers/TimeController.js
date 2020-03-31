import moment from "moment";
import EventEmitter from "events";

const TIMECTRL_EVENT_NAMES = {
  TIME_CHANGE: "timeChange",
  ONE_FRAME: "oneFrame",
  DESKTOP_WHOLE_SECOND: "desktopWholeSecond",
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
    this.gameTime = moment("2004-01-01 09:00:00");
    this.desktopTime = moment();
    this.deltaDesktopTime = 0;
    this.speed = 60 * 1;

    this._timeInterval = null;

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
   * gametime strikes whole hour
   * @param {timeCallback} fn
   */
  onWholeClock(fn) {
    this._timeEmitter.on(TIMECTRL_EVENT_NAMES.WHOLE_CLOCK, fn);
  }

  /**
   * gametime strikes whole minute
   * @param {timeCallback} fn
   */
  onWholeMinute(fn) {
    this._timeEmitter.on(TIMECTRL_EVENT_NAMES.WHOLE_MINUTE, fn);
  }

  _startTime() {
    const timeTask = () => {
      this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.ONE_FRAME);

      const lastDesktopTime = this.desktopTime.clone();
      this.desktopTime = moment();
      const curDeltaDesktopTime = this.desktopTime.diff(lastDesktopTime);
      this.deltaDesktopTime += curDeltaDesktopTime;

      this._updateGametime(curDeltaDesktopTime);

      // update game time every one second in desktop
      if (this.deltaDesktopTime >= 1000) {
        this._timeEmitter.emit(
          TIMECTRL_EVENT_NAMES.DESKTOP_WHOLE_SECOND,
          this.gameTime
        );
        this.deltaDesktopTime = 0;
      }

      requestAnimationFrame(timeTask);
    };
    // this.timeInterval = setInterval(timeTask, 100);
    this._timeInterval = requestAnimationFrame(timeTask);
  }

  _updateGametime(desktopTime) {
    const lastTime = this.gameTime.clone();
    this.gameTime.add(this.speed * desktopTime, "milliseconds");
    this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.TIME_CHANGE, this.gameTime);

    if (lastTime.hour() !== this.gameTime.hour()) {
      this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.WHOLE_CLOCK, this.gameTime);
    }

    if (lastTime.date() !== this.gameTime.date()) {
      this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.NEW_DAY, this.gameTime);
    }

    if (lastTime.minute() !== this.gameTime.minute()) {
      this._timeEmitter.emit(TIMECTRL_EVENT_NAMES.WHOLE_MINUTE, this.gameTime);
    }
  }

  _destructor() {
    window.addEventListener("beforeunload", () => {
      // clearInterval(this.timeInterval);
      console.log("remove all timers");
      cancelAnimationFrame(this._timeInterval);
      this._timeEmitter.removeAllListeners();
    });
  }
}

export default new TimeController();
