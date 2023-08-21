import { Popup } from "./Popup.js"

class PopupWithConfirmation extends Popup {
  constructor({selector, deleteCardId}) {
    super({selector});
    this._deleteButton = document.querySelector('.popup__button_type_delete')
    this._deleteCardId = deleteCardId;
  }
  open(item) {
    super.open();
    this._item = item;
    //this._itemId = itemId;
  }
  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
      this._deleteCardId(this._item)
    })
  }
}
export {PopupWithConfirmation};