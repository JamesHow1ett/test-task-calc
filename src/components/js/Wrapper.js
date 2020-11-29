import React, { Component } from 'react';
import Calculator from '../../lib/Calculator';
import Memory from '../../lib/Memory';

// styles
import '../scss/Wrapper.scss';


class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.handleInputNumbers = this.handleInputNumbers.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
    this.handleAddArgm = this.handleAddArgm.bind(this);
    this.handleResult = this.handleResult.bind(this);
    this.handlePlusMinus = this.handlePlusMinus.bind(this);
    this.handleMemory = this.handleMemory.bind(this);
    this.showMemoryData = this.showMemoryData.bind(this);
    this.state = {
      arrayOfArgs: [],
      errorMsg: null,
      memoryData: window.localStorage.getItem('memoryData') ?? window.localStorage.setItem('memoryData', 0),
      memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty') ?? window.localStorage.setItem('memoryIsDirty', false)),
      operation: null,
      outputCurr: '',
      outputPrev: null,
      outputStart: 0,
      result: null,
    }
  }

  handleInputNumbers() {
    return (e) => {
      const target = e.target;
      return target.tagName === 'DIV' ?
        this.setState(prevState => ({
          outputCurr: prevState.outputCurr + target.dataset.val,
          errorMsg: null,
          result: null
        })) :
        target.tagName === 'SPAN' ?
        this.setState(prevState => ({
          outputCurr: prevState.outputCurr + target.parentNode.dataset.val,
          errorMsg: null,
          result: null
        })) : null
    }
  }

  handleAllClear() {
    return (this.setState({
      arrayOfArgs: [],
      errorMsg: null,
      operation: null,
      outputCurr: '',
      outputPrev: null,
      result: null
    }))
  }

  handleAddArgm() {
    return (e) => {
      if (!this.state.result && this.state.arrayOfArgs.length > 0) { return }
      if (this.state.result) {
        let arr = [this.state.result, e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op];
        return this.setState({
          arrayOfArgs: arr,
          errorMsg: null,
          operation: e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op,
          outputPrev: this.state.result,
          outputCurr: '',
          result: null
        });
      }
      let arr = [this.state.outputCurr, e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op];
      return this.setState({
        arrayOfArgs: arr,
        errorMsg: null,
        operation: e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op,
        outputCurr: '',
        outputPrev: this.state.outputCurr
      });
    }
  }

  handleResult() {
    let arr = [...this.state.arrayOfArgs, this.state.outputCurr];
    return (this.compute(arr), this.setState({arrayOfArgs: []}));
  }

  handlePlusMinus() {
    return this.setState({
      outputCurr: '',
      result: new Calculator(this.state.result ?? this.state.outputCurr).plusMinus()
    })
  }

  handleMemory() {
    return (e) => {
      let a = this.state.memoryData;
      let b = this.state.result ?? 0;
      let operation = e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op;
      switch(operation) {
        case 'm+':
          return (new Memory(a, b).saveAndAddition(), this.setState({
            memoryData: window.localStorage.getItem('memoryData'),
            memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty'))
          }));
        case 'm-':
          return (new Memory(a, b, this.state.memoryIsDirty).saveAndSubtract(), this.setState({
            memoryData: window.localStorage.getItem('memoryData'),
            memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty'))
          }));
        case 'mr':
          return this.showMemoryData();
        case 'mc':
          return (new Memory().memoryClear(), this.setState({
            memoryData: window.localStorage.getItem('memoryData'),
            memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty')),
            result: null
          }));
        default:
          return;
      }
    }
  }

  showMemoryData() {
    return this.setState({
      result: this.state.memoryData
    })
  }

  compute(arr) {
    try {
      switch(arr[1]) {
        case '+':
          return this.setState({
            outputPrev: null,
            outputCurr: '',
            operation: null,
            result: (new Calculator(arr[0], arr[2]).addition()).toString()
          });
        case '-':
          return this.setState({
            outputPrev: null,
            outputCurr: '',
            operation: null,
            result: (new Calculator(arr[0], arr[2]).subtract()).toString()
          });
        case '*':
          return this.setState({
            outputPrev: null,
            outputCurr: '',
            operation: null,
            result: (new Calculator(arr[0], arr[2]).multiplication()).toString()
          });
        case '/':
          return this.setState({
            outputPrev: null,
            outputCurr: '',
            operation: null,
            result: (new Calculator(arr[0], arr[2]).division()).toString()
          });
        case '%':
          return this.setState({
            outputPrev: null,
            outputCurr: '',
            operation: null,
            result: (new Calculator(arr[0], arr[2]).percent()).toString()
          })
        default:
          return;
      }
    }
    catch (error) {
      this.setState({
        errorMsg: error.message,
        operation: null,
        outputCurr: '',
        outputPrev: null
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
            onClick={this.handleMemory()}
            data-op="mc"
          >
            <span>mc</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleMemory()}
            data-op="mr"
          >
            <span>mr</span>
          </div>
          <div
            className="calculator__btn calculator__btn_grey"
            onClick={this.handleMemory()}
            data-op="m-"
          >
            <span>m-</span>
          </div>
          <div
            className="calculator__btn calculator__btn_orange"
            onClick={this.handleMemory()}
            data-op="m+"
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
