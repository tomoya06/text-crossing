export const ItemTypes = {
  'WEALTH': 'WEALTH',
  'FOOD': 'FOOD',
  'RAW_CREATION': 'RAW_CREATION',
  'HOUSE': 'HOUSE'
}

export default class Item {
  constructor(name, weight, type, typeValue, value) {
    this.id = name;
    this.weight = weight;
    this.type = type;
    /**@type {number} 属性价值 */
    this.typeValue = typeValue;
    /**@type {number} 等价价值。FOR CASH, typeValue : value = 1 : 1 */
    this.value = value;
  }
}