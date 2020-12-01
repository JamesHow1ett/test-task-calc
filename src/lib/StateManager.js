// decomposed logic

import Calculator from './Calculator';

class StateManager {
  clearState() {
    return {
      errorMsg: null,
      operation: null,
      outputCurr: '',
      outputPrev: null,
      result: null
    }
  }

  inputNumbers(prevInputValue, currentInputValue) {
    return {
      outputCurr: prevInputValue + currentInputValue,
      errorMsg: null,
      result: null
    }
  }

  setArguments(operation, isChunk = false, afterCalculate = false, outputPrev = null) {
    if (isChunk) {
      return {
        operation: operation
      }
    }
    if (afterCalculate) {
      return {
        errorMsg: null,
        operation: operation,
        outputPrev: outputPrev,
        outputCurr: '',
        result: null
      }
    }
    return {
      errorMsg: null,
      operation: operation,
      outputPrev: outputPrev,
      outputCurr: ''
    }
  }

  setStateAfterCalculate(a, b, operation, isChunk, operationSymbol = null) {
    if (isChunk) {
      return {
        outputPrev: (new Calculator(a, b)[operation]()).toString(),
        outputCurr: '',
        operation: operationSymbol,
        result: null
      }
    }
    return {
      outputPrev: null,
      outputCurr: '',
      operation: null,
      result: (new Calculator(a, b)[operation]()).toString()
    }
  }

  setPlusMinus(num) {
    return {
      outputCurr: '',
      result: (new Calculator(num).plusMinus()).toString()
    }
  }

  setErrorState(error) {
    return {
      errorMsg: error.message,
      operation: null,
      outputCurr: '',
      outputPrev: null
    }
  }

}

export default StateManager;
