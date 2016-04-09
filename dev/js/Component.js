import ComponentView from './ComponentView.js';
import ComponentModel from './ComponentModel.js';

// AKA "View model"
class ComponentViewModel {
  constructor (elType, elParent, data) {
    this.type = elType;
    this.parentSelector = elParent;
    // Make view and add to DOM
    var view = new ComponentView(this.type, data);
    this.container = document.querySelector(this.parentSelector);
    this.container.appendChild(view.el);

    // Make model and associate with view
    this.model = new ComponentModel(data, view);

    this.setBindings();
  }

  setBindings () {
    var config = { attributes: true, childList: true, characterData: true, subtree: true };
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var data = {};
        var target = mutation.target;
        if (mutation.type === 'attributes') {
          var attr = mutation.attributeName;
          data[attr] = target.getAttribute(attr);
        } else if (mutation.type === 'childList' || mutation.type === 'subTree') {
          data.innerHTML = target.innerHTML;
        } else if (mutation.type === 'characterData') {
          data.innerHTML = target.data;
        }

        this.model.update(data);
      }.bind(this));
    }.bind(this));

    observer.observe(this.model.view.el, config);
  }

  update (data) {
    var view = this.model.update(data);
    return view;
  }

  toJSON () {
    var obj = {
      type: this.type,
      parent: this.parentSelector,
      data: this.model.values
    };

    return JSON.stringify(obj);
  }
}

export default ComponentViewModel;
