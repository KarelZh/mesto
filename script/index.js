import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
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

//форма отправки добавления карточки
const popupFormCard = new PopupWithForm({
  selector: '.popup_type_card',
  submit: (item) => {
    cardsList.addItem(createCard(item));
    formCardValidator.disabledButton();
    popupFormCard.close();
  }
})
//Открытие попапа добавления карточки
popupAdd.addEventListener('click', () => {
  popupFormCard.open();
});


popupFormCard.setEventListeners(); 

const popupImageCard = new PopupWithImage({
  selector: '.popup_type_image',
  image: imageOpen,
  text: ImageText
});
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
});
const popupEditProfile = new PopupWithForm({
  selector: '.popup_type_information', 
  submit: (item) => {
    userInfo.setUserInfo(item);
    popupEditProfile.close();
  },
});
//открытие попапа информации о себе
popupOpen.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formProfileValidator.enableButton();
  popupEditProfile.open();
});



popupEditProfile.setEventListeners();

//popupOpen.addEventListener('click', function() {
//  informationName.value = infoName.textContent;
//  informationJob.value = infoJob.textContent;
//  formProfileValidator.enableButton();
//  popupInfoMesto.open();
//});
//открытие попапа с картинкой
function openImage(data) { 
  popupImageCard.open(data);
};


//popupAdd.addEventListener('click', () => popupAddCard.open());


//formCard.addEventListener('submit', function(evt) {
//  evt.preventDefault();
//  const name = cardMesto.value;
//  const link = cardLink.value;
//  const item = { name, link };
//  addCard(item);
//  formCard.reset();
//  formCardValidator.disabledButton();
//  popupAddCard.close();
//});
//formInformation.addEventListener('submit', function(evt) {
//  evt.preventDefault();
//  infoName.textContent = informationName.value;
//  infoJob.textContent = informationJob.value;
//  popupInfoMesto.close();
//});



const cardsContainer = document.querySelector('.elements');

function createCard(item) {
  const newCard = new Card(item, '.element__template', openImage); 
  return newCard.generateCard();
}
function addCard(item) {
  cardsContainer.prepend(createCard(item));
}

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});


const formProfileValidator = new FormValidator(configForm, formInformation);
const formCardValidator = new FormValidator(configForm, formCard);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
},cardsContainer);
cardsList.renderItems();



