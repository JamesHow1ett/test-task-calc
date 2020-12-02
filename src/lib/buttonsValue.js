const numberValues = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].reverse();
const operatorValuesFirstRow = ['AC', '+/-', '%', '/'];
const memoryRow = ['mc', 'mr', 'm-', 'm+'];
const operatorRight = ['*', '-', '+', '='];

const buttonValues = () => {
  return {
    numberValues: numberValues,
    operatorValuesFirstRow: operatorValuesFirstRow,
    memoryRow: memoryRow,
    operatorRight: operatorRight
  }
}

export default buttonValues;
