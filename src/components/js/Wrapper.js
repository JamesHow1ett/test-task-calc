import React, { Component } from 'react';



// styles
import '../scss/Wrapper.scss';

//let arrayOfArgs = [];

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.handleInputNumbers = this.handleInputNumbers.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
    this.handleAddArgm = this.handleAddArgm.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.state = {
      resultStart: 0,
      resultCurr: '',
      resultPrev: '',
      operation: '',
      arrayOfArgs: []
    }
  }

  handleInputNumbers() {
    return (e) => {
      const target = e.target;
      return target.tagName === 'DIV' ?
        this.setState(prevState => ({
          resultCurr: prevState.resultCurr + target.dataset.val
        })) :
        target.tagName === 'SPAN' ?
        this.setState(prevState => ({
          resultCurr: prevState.resultCurr + target.parentNode.dataset.val
        })) : null
    }
  }

  handleAllClear() {
    return (this.setState({
      resultCurr: '',
      resultPrev: '',
      operation: '',
      arrayOfArgs: []
    }))
  }

  handleAddArgm() {
    return (e) => {
      let arr = [this.state.resultCurr, e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op];
      return this.setState({
        resultPrev: this.state.resultCurr,
        operation: e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op,
        arrayOfArgs: arr,
        resultCurr: ''
      })
    }
  }

  handleResult() {
    let arr = [...this.state.arrayOfArgs, this.state.resultCurr];
    console.log('RES', arr);
    return this.compute(arr);
  }

  compute(arr) {
    // eslint-disable-next-line default-case
    switch(arr[1]) {
      case '+':
        return this.fnPlus(Number(arr[0]),Number(arr[2]));
      case '-':
        return this.fnMinus(Number(arr[0]), Number(arr[2]));
      case '*':
        return this.fnMultiply(Number(arr[0]), Number(arr[2]));
      case '/':
        return this.fnDivide(Number(arr[0]), Number(arr[2]));
    }
  }

  fnPlus(a, b) {
    let res = a + b;
    let resStr = res.toString();
    return this.setState({
      resultPrev: '',
      operation: '',
      resultCurr: resStr
    });
  }

  fnMinus(a, b) {
    let res = a - b;
    let resStr = res.toString();
    return this.setState({
      resultPrev: '',
      operation: '',
      resultCurr: resStr
    });
  }

  fnMultiply(a, b) {
    let res = a * b;
    let resStr = res.toString();
    return this.setState({
      resultPrev: '',
      operation: '',
      resultCurr: resStr
    });
  }

  fnDivide(a, b) {
    if (b === 0) {
      return this.setState({
        resultPrev: '',
        operation: '',
        resultCurr: 'Error'
      });
    }
    let res = a / b;
    let resStr = res.toString();
    return this.setState({
      resultPrev: '',
      operation: '',
      resultCurr: resStr
    });
  }


  render() {
    return (
      <div className="calculator">
        <div className="calculator__result">
          <div className="calculator__result_prev">
            <span>
              {this.state.resultPrev}
              {this.state.operation}
            </span>
          </div>
          <div className="calculator__result_curr">
            <span>
              { this.state.resultCurr ? this.state.resultCurr.replace(/^0/g, '') : this.state.resultStart }
              {console.log(this.state.arrayOfArgs)}
              {console.log(this.state.resultPrev)}
            </span>
          </div>
        </div>
        <div className="calculator__controls">
          <div
            className="calculator__btn calculator__btn_light-grey"
            onClick={() => (this.handleAllClear())}
          >
            <span>AC</span>
          </div>
          <div
            className="calculator__btn calculator__btn_light-grey"
          >
            <span>+/-</span>
          </div>
          <div
            className="calculator__btn calculator__btn_light-grey"
          >
            <span>%</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={this.handleAddArgm()}
            data-op="/"
          >
            <span>/</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
          >
            <span>mc</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
          >
            <span>mr</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
          >
            <span>m-</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
          >
            <span>m+</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="7"
          >
            <span>7</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="8"
          >
            <span>8</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="9"
          >
            <span>9</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={this.handleAddArgm()}
            data-op="*"
          >
            <span>*</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="4"
          >
            <span>4</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="5"
          >
            <span>5</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="6"
          >
            <span>6</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={this.handleAddArgm()}
            data-op="-"
          >
            <span>-</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="1"
          >
            <span>1</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="2"
          >
            <span>2</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="3"
          >
            <span>3</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={this.handleAddArgm()}
            data-op="+"
          >
            <span>+</span>
          </div>
          <div
            className="calculator__btn calculator__btn_big calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val="0"
          >
            <span>0</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleInputNumbers()}
            data-val=","
          >
            <span>,</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={() => (this.handleResult())}
          >
            <span>=</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Wrapper
