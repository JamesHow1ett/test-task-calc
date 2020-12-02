function formatOutputString (str = '0') {
  // to do
  const strHasZeros = /(?<=^0)(0{1,})/g;
  const firstIsZero = /(^0{1,})(?=\d)/g;
  const coma = /(^\d.\d{1,}(?=.))/g;
  function onlyOneZero (p1) {
    p1 = '';
    return p1;
  }
  function removeFirstZero (p1) {
    p1 = '';
    return p1;
  }
  function onlyOnecoma (match) {
    return match;
  }
  /*
  (/(?<=^0)(0{1,})/g.test(this.state.outputCurr) ?
                this.state.outputCurr.replace(/(?<=^0)(0{1,})/g, '0') :
                this.state.outputCurr.replace(/^00{1,}(?=\d)/g, ''))
  */
  // (^\d.\d{1,}(?=.)) try to find .


  if (strHasZeros) {
    return str.replace(strHasZeros, onlyOneZero);
  }
  if (firstIsZero) {
    return str.replace(firstIsZero, removeFirstZero);
  }
  if (coma) {
    return str.replace(coma, onlyOnecoma);
  }
  return str;
}

export default formatOutputString;
