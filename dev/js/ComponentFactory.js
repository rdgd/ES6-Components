import ComponentViewModel from './Component.js';

class ComponentFactory {
  constructor (elTypeOrData, elParent, data) {
    var reconstituting = arguments.length < 3;
    var elType = reconstituting ? elTypeOrData.type : elTypeOrData;
    elParent = reconstituting ? elTypeOrData.parent : elParent;
    data = reconstituting ? elTypeOrData.data : data;

    return new ComponentViewModel(elType, elParent, data);
  }
}

export default ComponentFactory;
