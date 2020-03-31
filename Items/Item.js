export const ItemTypes = {
  'WEALTH': ['MONEY', 'MINE'],
  'FOOD': ['PLANT', 'ANIMAL', 'MANUAL'],
  'HOUSE': ['HPLANT', 'OBJECT']
}

export default class Item {
  constructor(name, weight, type, subType, typeValue, value, count) {
    this.name = name;
    this.weight = weight;
    this.type = type;
    this.subType = subType;
    this.typeValue = typeValue;
    /**@type {number} */
    this.value = value;
    this.count = count;
  }
}