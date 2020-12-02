// extend memory class for update state after save to memory
import Memory from './Memory';

class MemoryStateManager extends Memory {
  constructor(a, b, operation, m = false) {
    super(a, b, m);
    this.operation = operation;
  }

  setStateAfterSaveToMemory() {
    switch(this.operation) {
      case 'm+':
        this.saveAndAddition();
        return {
          memoryData: window.localStorage.getItem('memoryData'),
          memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty'))
        }
      case 'm-':
        this.saveAndSubtract();
        return {
          memoryData: window.localStorage.getItem('memoryData'),
          memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty'))
        }
      case 'mc':
        this.memoryClear();
        return {
          memoryData: window.localStorage.getItem('memoryData'),
          memoryIsDirty: JSON.parse(window.localStorage.getItem('memoryIsDirty')),
          result: null
        }
      default:
        return;
    }
  }
}

export default MemoryStateManager;
