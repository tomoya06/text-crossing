import Item from "../Items/Item";

export default class PackageItem {
  /**
   * 
   * @param {Item} item 
   * @param {number} amount 
   */
  constructor(item, amount) {
    this.item = item;
    this.amount = amount;
  }

  get itemWeight() {
    return this.item.weight * this.amount;
  }
}