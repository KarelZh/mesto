import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({selector, submit}) {
    super({selector});
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(
      this._form.querySelectorAll('.popup__info')
    );
  }
  _getInputValues() {
    this._inputValues = {}
    this._inputList.forEach((element) => {
      this._inputValues[element.name] = element.value;
    });
    return this._inputValues;
  }
  setInputValues = (data) => {
    this._inputList.forEach((element) => {
      element.value = data[element.name];
    });
  };
  close() {
    super.close();
    this._form.reset();
  };
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
    })
    super.setEventListeners();
  };
};
export {PopupWithForm};