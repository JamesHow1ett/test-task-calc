import React, { Component } from 'react';
import Memory from '../../lib/Memory';
import StateManager from '../../lib/StateManager';
import buttonValues from '../../lib/buttonsValue';

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
    });
  }

  compute(arrayOfArguments, isChunk = false) {
    try {
      switch(arrayOfArguments[1]) {
        case '+':
          return this.setState(new StateManager().setStateAfterCalculate(
            arrayOfArguments[0],
            arrayOfArguments[2],
            'addition',
            isChunk,
            '+'
          ));
        case '-':
          return this.setState(new StateManager().setStateAfterCalculate(
            arrayOfArguments[0],
            arrayOfArguments[2],
            'subtract',
            isChunk,
            '-'
          ));
        case '*':
          return this.setState(new StateManager().setStateAfterCalculate(
            arrayOfArguments[0],
            arrayOfArguments[2],
            'multiplication',
            isChunk,
            '*'
          ));
        case '/':
          return this.setState(new StateManager().setStateAfterCalculate(
            arrayOfArguments[0],
            arrayOfArguments[2],
            'division',
            isChunk,
            '/'
          ));
        case '%':
          return this.setState(new StateManager().setStateAfterCalculate(
            arrayOfArguments[0],
            arrayOfArguments[2],
            'percent',
            isChunk,
            '%'
          ));
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
                      <div
                        className="calculator__btn calculator__btn_light-grey"
                        onClick={() => (this.handleAllClear())}
                      >
                        <span>{elem}</span>
                      </div>
                    );
                  case '+/-':
                    return (
                      <div
                        className="calculator__btn calculator__btn_light-grey"
                        onClick={() => (this.handlePlusMinus())}
                      >
                        <span>&#177;</span>
                      </div>
                    );
                  default:
                    return index < lastIndex ? (
                      <div
                        className="calculator__btn calculator__btn_light-grey"
                        onClick={this.handleAddArgm()}
                        data-op={elem}
                      >
                        <span>{elem}</span>
                      </div>
                    ) :
                    (
                      <div
                        className="calculator__btn calculator__btn_orange"
                        onClick={this.handleAddArgm()}
                        data-op={elem}
                      >
                        <span>{elem}</span>
                      </div>
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
                  <div
                    className="calculator__btn calculator__btn_grey"
                    onClick={this.handleMemory()}
                    data-op={elem}
                  >
                    <span>{elem}</span>
                  </div>
                ) :
                (
                  <div
                    className="calculator__btn calculator__btn_orange"
                    onClick={this.handleMemory()}
                    data-op={elem}
                  >
                    <span>{elem}</span>
                  </div>
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
                        <div
                          className="calculator__btn calculator__btn_big calculator__btn_grey"
                          onClick={this.handleInputNumbers()}
                          data-val={item}
                        >
                          <span>{item}</span>
                        </div>
                      );
                    default:
                      return (
                        <div
                          className="calculator__btn calculator__btn_grey"
                          onClick={this.handleInputNumbers()}
                          data-val={item}
                        >
                          <span>{item}</span>
                        </div>
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
                        <div
                          className="calculator__btn calculator__btn_orange"
                          onClick={this.handleResult}
                        >
                          <span>{item}</span>
                        </div>
                      );
                    default:
                      return (
                        <div
                          className="calculator__btn calculator__btn_orange"
                          onClick={this.handleAddArgm()}
                          data-op={item}
                        >
                          <span>{item}</span>
                        </div>
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
