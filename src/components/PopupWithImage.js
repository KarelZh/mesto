import { Popup } from "./Popup.js"

class PopupWithImage extends Popup {
  constructor({selector, image, text}) {
    super({selector});
    this._image = image;
    this._text = text;
  }
  open(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._text.textContent = data.name;
    super.open();
  }
}
export {PopupWithImage};