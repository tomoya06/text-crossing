import Item, { ItemTypes } from '../Item';

export default class Chicken extends Item {
  constructor() {
    super('Chicken', 200, ItemTypes.FOOD, 30, 20);
  }
}