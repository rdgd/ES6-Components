class ComponentModel {
  constructor (values, view) {
    this.view = view;
    this.values = {};
    this.update(values);
    return this;
  }

  update (values) {
    var el;
    var changed = {};
    for (var key in values) {
      var val = values[key];
      if (this.values[key] !== val) {
        this.values[key] = val;
        changed[key] = val;
      }
    }

    return this.view.update(changed);
  }

  toJSON () {
    return JSON.stringify(this.values);
  }
}

export default ComponentModel;
