import '../pages/index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

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

//Переменные попапа удаления карточки
//const popupDeleteCard = document.querySelector('.popup_type_delete');
const buttonDeleteCard = document.querySelector('.popup__button_type_delete');

//Переменные попапа смены аватара
const popupAvatar = document.querySelector('.popup_type_avatar')
const popupAddAvatar = document.querySelector('.profile__content')
const formAvatar = popupAvatar.querySelector('.popup__form_type_avatar')


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '9430b557-5691-4068-a9d3-25e6e6adc7cd',
    'Content-Type': 'application/json'
  }
});
//форма отправки добавления карточки
const popupFormCard = new PopupWithForm({
  selector: '.popup_type_card',
  submit: (item, button) => {
    renderLoad(button, 'Создание...')
    api.generateCard(item.mesto, item.link, item.likes).then((res) => {
      cardsSection.prependItem(createCard(res))
      popupFormCard.close();
    })
    .catch((err) => {
      console.error(err)
    }).finally(() => {
      renderLoad(button, 'Создать')
    })
    formCardValidator.disableButton();
  }
})
//Открытие попапа добавления карточки
popupAdd.addEventListener('click', () => {
  popupFormCard.open();
});

const popupDelete = new PopupWithConfirmation({
  selector: '.popup_type_delete',
  handleDelete: (instance) => {
    api.deleteCard(instance.getId()).then(() => {
      instance.deleteCard();
      popupDelete.close();
    }).catch((err) => {
      console.error(err);
    })
  }
})

popupDelete.setEventListeners();
popupFormCard.setEventListeners(); 

const popupImageCard = new PopupWithImage({
  selector: '.popup_type_image',
  image: imageOpen,
  text: imageText
});
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userUrlSelector: '.profile__image'
});
const popupEditProfile = new PopupWithForm({
  selector: '.popup_type_information', 
  submit: (item, button) => {
    renderLoad(button, 'Сохранение...')
    api.setUserInfo(item.name, item.about).then(() => {
      userInfo.setUserInfo(item);
      popupEditProfile.close();
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      renderLoad(button, 'Сохранить')
    })
  }
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

const popupFormAvatar = new PopupWithForm({
  selector: '.popup_type_avatar',
  submit: (item, button) => {
    renderLoad(button, 'Сохранение...')
    api.addAvatar(item.avatar).then((res) => {
      userInfo.setAvatar(res)
      popupFormAvatar.close();
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      renderLoad(button, 'Сохранить')
    })
    formAvatarValidator.disableButton();
  }
})
//Открытие попапа аватара
popupAddAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
})
popupFormAvatar.setEventListeners();
//Функция смены текста сабмита
function renderLoad(button, text) {
    button.textContent = text;
}
const cardsContainer = document.querySelector('.elements');

function createCard(item) {
  const newCard = new Card(
    item,
    '.element__template', 
    handleCardClick, 
    buttonDeleteCard, 
    userID,
    function likeCardApi(item) {
      api.likeCard(item).then((res) => {
        newCard.updateLikes(res.likes)
      }).catch((err) => {
        console.error(err)
      })
    },
    function deleteLikeCardApi(item) {
      api.deleteLikeCard(item).then((res) => {
        newCard.updateLikes(res.likes)
      }).catch((err) => {
        console.error(err)
      })
    }, function openDeleteCard(cardElement) {
      popupDelete.open(cardElement)
    }); 
  return newCard.generateCard();
}


const formProfileValidator = new FormValidator(configForm, formInformation);
const formCardValidator = new FormValidator(configForm, formCard);
const formAvatarValidator = new FormValidator(configForm, formAvatar);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();



let userID;

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.appendItem(createCard(item));
  },
}, '.elements');

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
]).then(([user, cards]) => {
  userID = user._id;
  userInfo.setUserInfo(user)
  userInfo.setAvatar(user)
  cardsSection.renderItems(cards)
}).catch((err) => {
    console.error(err)
  })
