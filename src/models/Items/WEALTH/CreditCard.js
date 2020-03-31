import Item, { ItemTypes } from '../Item';

export default class CreditCard extends Item {
  constructor() {
    super('Cash', 0.1, ItemTypes.WEALTH, 1, 1);
  }
}