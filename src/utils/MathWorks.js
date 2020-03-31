class MathWorks {
  powRate(max, rate, threshold) {
    const LENGTH = 1 / rate;
    let fn = x => Math.pow(Math.E, x - LENGTH) * max;
    let xx = Math.random() * LENGTH;
    let yy = fn(xx);
    if (threshold && yy < threshold) {
      return 0;
    }
    return yy;
  }
}

export default new MathWorks();
