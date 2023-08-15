import { Popup } from "./Popup.js"

class PopupWithConfirmation extends Popup {
  constructor({selector, deleteCardId}) {
    super({selector});
    this._deleteCardId = deleteCardId;
  }
  open(item, itemId) {
    super.open();
    this._item = item;
    this._itemId = itemId;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('click', () => {
      this._deleteCardId(this._item, this._itemId)
    }, false)
  }
}
export {PopupWithConfirmation};