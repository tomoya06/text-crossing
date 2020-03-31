import Item, { ItemTypes } from '../Item';

export default class HouseItem extends Item {
  constructor(name, weight, typeValue, value, antiRain, antiWind) {
    super(name, weight, ItemTypes.HOUSE, typeValue, value);
    this.antiRain = antiRain;
    this.antiWind = antiWind;
  }
}