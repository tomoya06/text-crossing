import Item, { ItemTypes } from '../Item';

export default class Pork extends Item {
  constructor() {
    super('Pork', '🐷', 200, ItemTypes.FOOD, 2, 80);
  }
}