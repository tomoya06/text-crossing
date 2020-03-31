import Item, { ItemTypes } from "../Items/Item";

export default class SimpleHouse {
  constructor(name) {
    this.name = name;
    this.endurance = 100;
    this.antiRain = 1;
    this.antiWind = 0.8;
  }

  /**
   * 
   * @param {Item} item 
   */
  reinforce(item) {
    if (item.type === ItemTypes.HOUSE) {
      
    }
  }
}