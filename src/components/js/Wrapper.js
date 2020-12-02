import React, { Component } from 'react';
import StateManager from '../../lib/StateManager';
import MemoryStateManager from '../../lib/MemoryStateManager';
import buttonValues from '../../lib/buttonsValue';

// components
import Button from './Button';

// styles
import '../scss/Wrapper.scss';

// initial buttonValues obj
const buttons = buttonValues();

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
      errorMsg: null,
      memoryData: window.localStorage.getItem('memoryData') ?? window.localStorage.setItem('memoryData', 0),
      memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty')) ?? window.localStorage.setItem('memoryIsDirty', false),
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
        this.setState(prevState => (
          new StateManager().inputNumbers(prevState.outputCurr, target.dataset.val)
        )) :
        target.tagName === 'SPAN' ?
        this.setState(prevState => (
          new StateManager().inputNumbers(prevState.outputCurr, target.parentNode.dataset.val)
        )) : null
    }
  }

  handleAllClear() {
    return (this.setState(new StateManager().clearState()));
  }

  handleAddArgm() {
    return (e) => {
      let arrayOfArguments = [this.state.outputPrev, this.state.operation, this.state.outputCurr];
      let operation = e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op;
      if (this.state.outputPrev && this.state.outputCurr && this.state.operation) {
        return (this.compute(arrayOfArguments, true), this.setState(new StateManager().setArguments(operation, true)));
      }
      if (this.state.result) {
        return this.setState(new StateManager().setArguments(operation, false, true, this.state.result));
      }
      return this.setState(new StateManager().setArguments(operation, false, false, this.state.outputCurr));
    }
  }

  handleResult() {
    let arrayOfArguments = [this.state.outputPrev, this.state.operation, this.state.outputCurr ? this.state.outputCurr : this.state.outputStart];
    return this.compute(arrayOfArguments);
  }

  handlePlusMinus() {
    return this.setState(new StateManager().setPlusMinus(this.state.result ?? this.state.outputCurr));
  }

  handleMemory() {
    return (e) => {
      let a = this.state.memoryData;
      let b = this.state.result ?? this.state.outputCurr;
      let operation = e.target.dataset.op ? e.target.dataset.op : e.target.parentNode.dataset.op;
      switch(operation) {
        case 'm+':
          return this.setState(
            new MemoryStateManager(a, b, operation).setStateAfterSaveToMemory()
          );
        case 'm-':
          return this.setState(
            new MemoryStateManager(a, b, operation, this.state.memoryIsDirty).setStateAfterSaveToMemory()
          );
        case 'mr':
          return this.showMemoryData();
        case 'mc':
          return this.setState(
            new MemoryStateManager(0, 0, operation).setStateAfterSaveToMemory()
          )
        default:
          return;
      }
    }
  }

  showMemoryData() {
    return this.setState({
      outputCurr: '',
      result: this.state.memoryData
    });
  }

  compute(arrayOfArguments, isChunk = false) {
    try {
      switch(arrayOfArguments[1]) {
        case '+':
          return this.setState(
            new StateManager().setStateAfterCalculate(arrayOfArguments[0], arrayOfArguments[2], 'addition', isChunk, '+')
          );
        case '-':
          return this.setState(
            new StateManager().setStateAfterCalculate(arrayOfArguments[0], arrayOfArguments[2], 'subtract', isChunk, '-')
          );
        case '*':
          return this.setState(
            new StateManager().setStateAfterCalculate(arrayOfArguments[0], arrayOfArguments[2], 'multiplication', isChunk, '*')
          );
        case '/':
          return this.setState(
            new StateManager().setStateAfterCalculate(arrayOfArguments[0], arrayOfArguments[2], 'division', isChunk, '/')
          );
        case '%':
          return this.setState(
            new StateManager().setStateAfterCalculate(arrayOfArguments[0], arrayOfArguments[2], 'percent', isChunk, '%')
          );
        default:
          return;
      }
    }
    catch (error) {
      this.setState(new StateManager().setErrorState(error));
    }
  }


  render() {
    return (
      <div className="calculator">
        <div className="calculator__output">
          <div className="calculator__output_prev">
            <span>
              {
                this.state.memoryIsDirty ? 'memory' : ''
              }
            </span>
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
        <div className="calculator__controls-row">
          <div className="calculator__controls-row_first">
            {
              buttons.operatorValuesFirstRow.map((elem, index, array) => {
                const lastIndex = array.length - 1;
                switch(elem) {
                  case 'AC':
                    return (
                      <Button
                        className="calculator__btn calculator__btn_light-grey"
                        onClick={() => (this.handleAllClear())}
                      >
                        <span>{elem}</span>
                      </Button>
                    );
                  case '+/-':
                    return (
                      <Button
                        className="calculator__btn calculator__btn_light-grey"
                        onClick={() => (this.handlePlusMinus())}
                      >
                        <span>&#177;</span>
                      </Button>
                    );
                  default:
                    return index < lastIndex ? (
                      <Button
                        className="calculator__btn calculator__btn_light-grey"
                        onClick={this.handleAddArgm()}
                        data-op={elem}
                      >
                        <span>{elem}</span>
                      </Button>
                    ) :
                    (
                      <Button
                        className="calculator__btn calculator__btn_orange"
                        onClick={this.handleAddArgm()}
                        data-op={elem}
                      >
                        <span>{elem}</span>
                      </Button>
                    );
                }
              })
            }
          </div>
          <div className="calculator__controls-row_second">
            {
              buttons.memoryRow.map((elem, index, array) => {
                const lastIndex = array.length - 1;
                return index < lastIndex ?
                (
                  <Button
                    className="calculator__btn calculator__btn_grey"
                    onClick={this.handleMemory()}
                    data-op={elem}
                  >
                    <span>{elem}</span>
                  </Button>
                ) :
                (
                  <Button
                    className="calculator__btn calculator__btn_orange"
                    onClick={this.handleMemory()}
                    data-op={elem}
                  >
                    <span>{elem}</span>
                  </Button>
                )
              })
            }
          </div>
          <div className="calculator__controls-row_third">
            <div className="calculator__controls-row_third-grid">
              {
                buttons.numberValues.reverse().map(item => {
                  switch(item) {
                    case '0':
                      return (
                        <Button
                          className="calculator__btn calculator__btn_big calculator__btn_grey"
                          onClick={this.handleInputNumbers()}
                          data-val={item}
                        >
                          <span>{item}</span>
                        </Button>
                      );
                    default:
                      return (
                        <Button
                          className="calculator__btn calculator__btn_grey"
                          onClick={this.handleInputNumbers()}
                          data-val={item}
                        >
                          <span>{item}</span>
                        </Button>
                      );
                  }
                })
              }
            </div>
            <div className="calculator__controls-row_third-column">
              {
                buttons.operatorRight.map(item => {
                  switch(item) {
                    case '=':
                      return (
                        <Button
                          className="calculator__btn calculator__btn_orange"
                          onClick={this.handleResult}
                        >
                          <span>{item}</span>
                        </Button>
                      );
                    default:
                      return (
                        <Button
                          className="calculator__btn calculator__btn_orange"
                          onClick={this.handleAddArgm()}
                          data-op={item}
                        >
                          <span>{item}</span>
                        </Button>
                      );
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Wrapper
