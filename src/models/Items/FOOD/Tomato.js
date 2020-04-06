import Item, { ItemTypes } from '../Item';

export default class Tomato extends Item {
  constructor() {
    super('Tomato', '🍅', 10, ItemTypes.FOOD, 1, 2);
  }
}