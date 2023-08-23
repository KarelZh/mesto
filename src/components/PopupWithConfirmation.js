import { Popup } from "./Popup.js"

class PopupWithConfirmation extends Popup {
  constructor({selector, handleDelete}) {
    super({selector});
    this._deleteButton = this._popup.querySelector('.popup__button_type_delete')
    this._handleDelete = handleDelete;
  }
  open(item) {
    super.open();
    this._item = item;
  }
  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete(this._item)
    })
  }
}
export {PopupWithConfirmation};