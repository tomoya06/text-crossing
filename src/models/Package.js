import Item from "./Items/Item";
import PackageItem from "./Package/PackageItem";

export default class Package {
  constructor(maxCarry) {
    this.maxCarry = maxCarry;
    /** @type {PackageItem[]} */
    this.items = [];
  }

  get curCarry() {
    // return this.items.map(item => item.obj.weight).reduce((a, b) => a + b, 0);
    return this.items.reduce((a, b) => a.itemWeight + b.itemWeight, 0);
  }

  /**
   * TODO: combine same items with amount
   * @param {Item} item
   */
  put(item, amount = 1) {
    if (item.weight + this.curCarry > this.maxCarry) {
      return false;
    }
    const sameItems = this.items.find(_item => _item.item.id === item.id);
    if (sameItems) {
      sameItems.amount += amount;
    } else {
      this.items.push(new PackageItem(item, amount));
    }
    return true;
  }

  drop(index, amount = 1) {
    if (!this.items[index]) {
      return false;
    }
    if (this.items[index].amount === amount) {
      this.items.splice(index, 1);
    } else {
      this.items[index].amount -= amount;
    }
    return true;
  }

  use(index, amount = 1) {
    if (!this.items[index]) {
      return null;
    }
    if (this.items[index].amount < amount) {
      return null;
    }
    this.items[index].amount -= amount;
    return new PackageItem(this.items[index].item, amount);
  }
}
