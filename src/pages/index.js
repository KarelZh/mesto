import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
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
const popupAdd = document.querySelector('.profile__add');
const formCard = popupCard.querySelector('.popup__form_type_mesto');

// Переменные попапа редактирования имени и профессии
const popupInformation = document.querySelector('.popup_type_information');
const popupOpen = document.querySelector('.profile__button');
const formInformation = popupInformation.querySelector('.popup__form_type_name');

//Переменные попапа с картинкой
const popupImage = document.querySelector('.popup_type_image');
const imageOpen = popupImage.querySelector('.popup__image');
const imageText = popupImage.querySelector('.popup__name');

//форма отправки добавления карточки
const popupFormCard = new PopupWithForm({
  selector: '.popup_type_card',
  submit: (item) => {
    cardsList.addItem(createCard(item));;
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
  text: imageText
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


//открытие попапа с картинкой
function handleCardClick(data) { 
  popupImageCard.open(data);
};

popupImageCard.setEventListeners();




const cardsContainer = document.querySelector('.elements');

function createCard(item) {
  const newCard = new Card(item, '.element__template', handleCardClick); 
  return newCard.generateCard();
}

const formProfileValidator = new FormValidator(configForm, formInformation);
const formCardValidator = new FormValidator(configForm, formCard);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  },
}, '.elements');
cardsList.renderItems();


console.log('Hello, World!')
