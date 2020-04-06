import EventEmitter from "events";
import TimeController from './TimeController';

class MessageController {
  constructor() {
    this.messages = [];
    this._eventEmitter = new EventEmitter();
  }

  sendMessage(msg) {
    const curGameTime = TimeController.gameTime.clone().format('HH:mm:ss');
    const newMsg = `${curGameTime}: ${msg}`;
    this.messages.push(newMsg);
    this._eventEmitter.emit("NEWMSG", newMsg, this.messages);
  }

  handleNewMessage(fn) {
    this._eventEmitter.on("NEWMSG", fn);
  }
}

export default new MessageController();
