import React, { Component } from 'react';
import Calculator from '../../lib/Calculator';



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
    this.handlePlusMinus = this.handlePlusMinus.bind(this);
    this.state = {
      outputStart: 0,
      outputCurr: '',
      outputPrev: '',
      operation: '',
      arrayOfArgs: [],
      result: null,
      errorMsg: null,
      isChunk: false
    }
  }

  handleInputNumbers() {
    return (e) => {
      const target = e.target;
      return target.tagName === 'DIV' ?
        this.setState(prevState => ({
          outputCurr: prevState.outputCurr + target.dataset.val
        })) :
        target.tagName === 'SPAN' ?
        this.setState(prevState => ({
          outputCurr: prevState.outputCurr + target.parentNode.dataset.val
        })) : null
    }
  }

  handleAllClear() {
    return (this.setState({
      outputCurr: '',
      outputPrev: '',
      operation: '',
      arrayOfArgs: [],
      result: null
    }))
  }

  handleAddArgm() {
    return (e) => {
      if (this.state.arrayOfArgs.length > 1) {
        let arr = [...this.state.arrayOfArgs, this.state.outputCurr];
        return this.compute(arr);
      }
      let arr = [this.state.outputCurr, e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op];
      return this.setState({
        outputPrev: this.state.outputCurr,
        operation: e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op,
        arrayOfArgs: arr,
        outputCurr: ''
      })
    }
  }

  handleResult() {
    let arr = [...this.state.arrayOfArgs, this.state.outputCurr];
    return this.compute(arr);
  }

  handlePlusMinus() {
    return this.state.result ?
      this.setState({
        result: new Calculator(this.state.result, 0).plusMinus()
      }) :
      this.setState({
        outputCurr: new Calculator(this.state.outputCurr, 0).plusMinus()
      })
  }

  compute(arr) {
    try {
      switch(arr[1]) {
        case '+':
          return this.setState({
            outputPrev: '',
            outputCurr: '',
            operation: '',
            result: new Calculator(arr[0], arr[2]).addition()
          });
        case '-':
          return this.setState({
            outputPrev: '',
            outputCurr: '',
            operation: '',
            result: new Calculator(arr[0], arr[2]).subtract()
          });
        case '*':
          return this.setState({
            outputPrev: '',
            outputCurr: '',
            operation: '',
            result: new Calculator(arr[0], arr[2]).multiplication()
          });
        case '/':
          return this.setState({
            outputPrev: '',
            outputCurr: '',
            operation: '',
            result: new Calculator(arr[0], arr[2]).division()
          });
        case '%':
          return this.setState({
            outputPrev: '',
            outputCurr: '',
            operation: '',
            result: new Calculator(arr[0], arr[2]).percent()
          })
        default:
          return;
      }
    }
    catch (error) {
      this.setState({
        errorMsg: error.message
      })
    }
  }


  render() {
    return (
      <div className="calculator">
        <div className="calculator__output">
          <div className="calculator__output_prev">
            <span>
              { this.state.outputPrev }
              { this.state.operation }
            </span>
          </div>
          <div className="calculator__output_curr">
            <span>
              {
                this.state.outputCurr ?
                (/(?<=^0)(0{1,})/g.test(this.state.outputCurr) ?
                this.state.outputCurr.replace(/(?<=^0)(0{1,})/g, '0') :
                this.state.outputCurr.replace(/^00{1,}(?=\d)/g, '')) :
                (this.state.errorMsg ?? (this.state.result ?? this.state.outputStart)) 
              }
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
            onClick={() => (this.handlePlusMinus())}
          >
            <span>&#177;</span>
          </div>
          <div
            className="calculator__btn calculator__btn_light-grey"
            onClick={this.handleAddArgm()}
            data-op="%"
          >
            <span>&#37;</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={this.handleAddArgm()}
            data-op="/"
          >
            <span>&#247;</span>
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
            <span>&#215;</span>
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
            <span>&#8722;</span>
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
            <span>&#43;</span>
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
            data-val="."
          >
            <span>&#46;</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={() => (this.handleResult())}
          >
            <span>&#61;</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Wrapper
