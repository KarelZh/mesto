class Popup {
  constructor({selector}) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector('.popup__close');
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
    this._popup.addEventListener('click', this.setEventListeners());
  };
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
    this._popup.removeEventListener('click', this.setEventListeners());
  };
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    };
  };
  _handleOverlayClose = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.close(evt.currentTarget);
    }
  };
  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
  };
}
export {Popup};