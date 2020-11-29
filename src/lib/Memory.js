import Calculator from './Calculator';

class Memory extends Calculator {
  constructor(a, b, m = false) {
    super(a, b);
    this.memoryIsDirty = Boolean(m);
  }

  saveAndAddition() {
    let res = this.addition(this.a, this.b);
    return (window.localStorage.setItem('memoryData', res), window.localStorage.setItem('memoryIsDirty', true));
  }

  saveAndSubtract() {
    if (!this.memoryIsDirty) {
      this.a = this.b;
      this.b = 0;
      let res = this.subtract(this.a, this.b);
      return (window.localStorage.setItem('memoryData', res), window.localStorage.setItem('memoryIsDirty', true));
    }
    let res = this.subtract(this.a, this.b);
    return (window.localStorage.setItem('memoryData', res), window.localStorage.setItem('memoryIsDirty', true));
  }

  memoryClear() {
    return (window.localStorage.setItem('memoryData', 0), window.localStorage.setItem('memoryIsDirty', false));
  }

}


export default Memory;
