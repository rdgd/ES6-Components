class ComponentView {
  constructor (elType) {
    this.el = document.createElement(elType);
    return this;
  }

  update (props) {
    for (var prop in props) {
      var val = props[prop];
      if (prop in this.el) {
        this.el[prop] = val;
      } else {
        this.el.setAttribute(prop, val);
      }
    }

    return this.el;
  }
}


export default ComponentView;
