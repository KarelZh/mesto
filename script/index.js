let popupElement = document.querySelector('.popup');
let popupClose = popupElement.querySelector('.popup__close');
let popupOpen = document.querySelector('.profile__button');
let infoSave = popupElement.querySelector('.popup__form');
let inputName = popupElement.querySelector('.popup__info_type_name');
let inputJob = popupElement.querySelector('.popup__info_type_job');
let infoName = document.querySelector('.profile__name');
let infoJob = document.querySelector('.profile__job');


let openPopup = function () {
    popupElement.classList.add('popup_opened');
    inputName.value = infoName.textContent;
    inputJob.value = infoJob.textContent;
}

let closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    infoName.textContent = inputName.value;
    infoJob.textContent = inputJob.value;
    closePopup();
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
infoSave.addEventListener('submit', handleFormSubmit);