import Calculator from './Calculator';

class Memory extends Calculator {

  saveAndAddition() {
    let res = this.addition(this.a, this.b);
    return (window.localStorage.setItem('memoryData', res), window.localStorage.setItem('memoryIsDirty', true));
  }

  saveAndSubtract() {
    let res = this.subtract(this.a, this.b);
    return (window.localStorage.setItem('memoryData', res), window.localStorage.setItem('memoryIsDirty', true));
  }

  memoryClear() {
    return (window.localStorage.setItem('memoryData', 0), window.localStorage.setItem('memoryIsDirty', false));
  }

}


export default Memory;
