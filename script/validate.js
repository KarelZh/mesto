const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__info_type_inactive'
}

function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function disabledButton(buttonElement, config) {
  buttonElement.disabled = 'disabled';
  buttonElement.classList.add(config.inactiveButtonClass);
};

function enableButton(buttonElement, config) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disabledButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function isValid(inputElement, formElement, config) {
  console.log(inputElement.validationMessage)
  const inputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!errorElement) return;

  if (!inputValid) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  };
};

function setEventListeners(formElement, config) {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  inputs.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config);
      isValid(inputItem, formElement, config);
    });
  });
};

function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formItem) => {
    setEventListeners(formItem, config);
  });
};
enableValidation(configForm);