import Item, { ItemTypes } from "../Items/Item";
import HouseItem from "../Items/HOUSE/HouseItem";

export default class SimpleHouse {
  constructor(name) {
    this.name = name;
    this.endurance = 100;
    this.store = [];
    this.maxStoreContent = 100;
    this.antiRain = 100;
    this.antiWind = 100;
  }

  /**
   *
   * @param {HouseItem} item
   */
  reinforce(item) {
    if (item.type === ItemTypes.HOUSE) {
      this.antiRain += item.antiRain;
      this.antiWind += item.antiWind;
    }
  }

  /**
   *
   * @param {Item} item
   */
  storeItem(item) {
    if (this.maxStoreContent > this.store.length) {
      this.store.push(item);
      return true;
    }
    return false;
  }
}
