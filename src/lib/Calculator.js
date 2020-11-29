// calculator class
class Calculator {
  constructor(a, b) {
    this.a = Number(a);
    this.b = Number(b);
  }

  addition() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    return Math.floor((this.a + this.b) * 1000) / 1000;
  }

  subtract() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    return Math.floor((this.a - this.b) * 1000) / 1000;
  }

  multiplication() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    return Math.floor((this.a * this.b) * 1000) / 1000;
  }

  division() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    if (this.b === 0) {
      throw new Error('Error');
    }
    return Math.floor((this.a / this.b) * 1000) / 1000;
  }

  percent() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    let percent = this.a / 100;
    return Math.floor((this.b * percent) * 1000) / 1000;
  }

  plusMinus() {
    if (Number.isNaN(this.a)) {
      throw new Error('Error');
    }
    return this.a * (-1);
  }
}

module.exports = Calculator;
//export default Calculator;
