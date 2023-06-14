import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type_disabled',
  inputErrorClass: 'popup__info_type_inactive'
};
//Переменные попапа создания карточек
const popupCard = document.querySelector('.popup_type_card');
const cardClose = popupCard.querySelector('.popup__close_type_card');
const popupAdd = document.querySelector('.profile__add');
const formCard = popupCard.querySelector('.popup__form_type_mesto');
const cardMesto = popupCard.querySelector('.popup__info_type_mesto');
const cardLink = popupCard.querySelector('.popup__info_type_link');

// Переменные попапа редактирования имени и профессии
const popupInformation = document.querySelector('.popup_type_information');
const informationClose = popupInformation.querySelector('.popup__close_type_information');
const popupOpen = document.querySelector('.profile__button');
const formInformation = popupInformation.querySelector('.popup__form_type_name');
const informationName = popupInformation.querySelector('.popup__info_type_name');
const informationJob = popupInformation.querySelector('.popup__info_type_job');
const infoName = document.querySelector('.profile__name');
const infoJob = document.querySelector('.profile__job');

//Переменные попапа с картинкой
const popupImage = document.querySelector('.popup_type_image');
const imageClose = popupImage.querySelector('.popup__close_type_image');
const imageOpen = popupImage.querySelector('.popup__image');
const ImageText = popupImage.querySelector('.popup__name');

function openModal(modal) {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  modal.addEventListener('click', closeOverlay);
};

function closeModal(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  modal.removeEventListener('click', closeOverlay);
};

popupOpen.addEventListener('click', function() {
  informationName.value = infoName.textContent;
  informationJob.value = infoJob.textContent;
  formProfileValidator.enableButton();
  openModal(popupInformation);
});
function openImage(data) {
  imageOpen.src = data.link;
  imageOpen.alt = data.name;
  ImageText.textContent = data.name;
  openModal(popupImage);
};


//Закрытие попапа через ESC

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closeModal(popupOpened);
  };
};

//Закрытие попапа через Overlay

function closeOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  };
};


popupAdd.addEventListener('click', () => openModal(popupCard));
informationClose.addEventListener('click', () => closeModal(popupInformation));
cardClose.addEventListener('click', () => closeModal(popupCard));
imageClose.addEventListener('click', () => closeModal(popupImage));

formCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = cardMesto.value;
  const link = cardLink.value;
  const item = { name, link };
  addCard(item);
  formCard.reset();
  formCardValidator.disabledButton();
  closeModal(popupCard);
});
formInformation.addEventListener('submit', function(evt) {
  evt.preventDefault();
  infoName.textContent = informationName.value;
  infoJob.textContent = informationJob.value;
  closeModal(popupInformation);
});
const mesto = document.querySelector('.elements');
function createCard(item) {
  const newCard = new Card(item, '.element__template', openImage); 
  return newCard.generateCard();
}
function addCard(item) {
  createCard(item);
  mesto.prepend(createCard(item));
}

initialCards.forEach((item) => {
  createCard(item);
  mesto.append(createCard(item));
});


const formProfileValidator = new FormValidator(configForm, formInformation);
const formCardValidator = new FormValidator(configForm, formCard);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();