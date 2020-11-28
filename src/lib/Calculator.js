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
    let res = this.a + this.b;
    return res.toString();
  }

  subtract() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    let res = this.a - this.b;
    return res.toString();
  }

  multiplication() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    let res = this.a * this.b;
    return res.toString();
  }

  division() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    if (this.b === 0) {
      return 'Error';
    }
    let res = this.a / this.b;
    return res.toString();
  }

  percent() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    let percent = this.a / 100;
    let res = this.b * percent;
    return res.toString();
  }

  plusMinus() {
    if (Number.isNaN(this.a) || Number.isNaN(this.b)) {
      throw new Error('Error');
    }
    let res = this.a * (-1);
    return res.toString();
  }
}

export default Calculator;
