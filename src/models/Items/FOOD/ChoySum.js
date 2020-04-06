import Item, { ItemTypes } from '../Item';

export default class ChoySum extends Item {
  constructor() {
    super('ChoySum', '🥬', 10, ItemTypes.FOOD, 1, 4);
  }
}