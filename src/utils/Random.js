class Random {
  /**
   * 
   * @param {any[]} list 
   */
  pickOneItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  /**
   * 
   * @param {number} rate 
   */
  bool(rate) {
    return Math.random() < rate;
  }
}

export default new Random();