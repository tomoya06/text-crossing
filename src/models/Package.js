import Item from './Items/Item';

export default class Package {
  constructor(maxCarry) {
    this.maxCarry = maxCarry;
    /** @type {Item[]} */
    this.items = [];
  }

  get curCarry() {
    return this.items.map(item => item.weight).reduce((a, b) => a + b, 0);
  }

  /**
   * 
   * @param {Item} item 
   */
  put(item) {
    if (item.weight + this.curCarry > this.maxCarry) {
      return false;
    }
    this.items.push(item);
    return true;
  }

  drop(index) {
    if (!this.items[index]) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }
}
