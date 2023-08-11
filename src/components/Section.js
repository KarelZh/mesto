class Section {
  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  };
  addItem(element) {
    this._container.append(element);
  };
  newAddItem(element) {
    this._container.prepend(element);
  }
};
export {Section};