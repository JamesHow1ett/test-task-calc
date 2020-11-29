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
    return this.a + this.b;
  }

  subtract() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    return this.a - this.b;
  }

  multiplication() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    return this.a * this.b;
  }

  division() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    if (this.b === 0) {
      return 'Error';
    }
    return this.a / this.b;
  }

  percent() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    let percent = this.a / 100;
    return this.b * percent;
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
