class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };
  _showError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  };
  _hideError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  };
  disabledButton() {
    this._buttonElement.disabled = 'disabled';
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };
  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  };
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledButton();
    } else {
      this._enableButton();
    };
  };
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    };
  };
  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._isValid(inputElement);
      });
    });
  };
  enableValidation() {
    this._forms = Array.from(document.querySelectorAll(this._formSelector));
    this._forms.forEach((inputElement) => {
      this._setEventListeners(inputElement);
    });
  };
};
export {FormValidator};
