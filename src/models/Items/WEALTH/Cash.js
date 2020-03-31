import Item, { ItemTypes } from '../Item';

export default class Cash extends Item {
  constructor() {
    super('Cash', 0.01, ItemTypes.WEALTH, 1, 1);
  }
}