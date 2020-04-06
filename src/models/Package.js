import Item, { ItemTypes } from "./Items/Item";
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

  get sortedItems() {
    const sorted = {};
    for (let itemType of Object.keys(ItemTypes)) {
      sorted[`${ItemTypes[itemType]}`] = []
    }
    for (let item of this.items) {
      sorted[`${item.item.type}`].push(item); 
    }
    return sorted;
  }

  get firstItem() {
    if (this.items.length) {
      return this.items[0];
    }
    return undefined;
  }

  /**
   * TODO: combine same items with amount
   * @param {Item} item
   */
  put(item, amount = 1) {
    if (item.weight + this.curCarry > this.maxCarry) {
      return false;
    }
    const sameItems = this.items.find((_item) => _item.item.id === item.id);
    if (sameItems) {
      sameItems.amount += amount;
    } else {
      this.items.push(new PackageItem(item, amount));
    }
    return true;
  }

  use(itemId, amount = 1) {
    const packageItem = this.find(itemId);
    if (!packageItem) {
      return;
    }
    amount = packageItem.amount < amount ? packageItem.amount : amount;
    packageItem.amount -= amount;
    this.cleanEmptyItem();
    return new PackageItem(packageItem.item, amount);
  }

  find(itemId) {
    return this.items.find((item) => item.item.id === itemId);
  }

  cleanEmptyItem() {
    this.items = this.items.filter((packageItem) => packageItem.amount > 0);
  }
}
