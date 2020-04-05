import Item, { ItemTypes } from '../Item';

export default class HouseItem extends Item {
  constructor(name, icon, weight, typeValue, value, antiRain, antiWind) {
    super(name, icon, weight, ItemTypes.HOUSE, typeValue, value);
    this.antiRain = antiRain;
    this.antiWind = antiWind;
  }
}