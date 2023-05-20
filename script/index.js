  //Переменные попапа создания карточек
const popupCard = document.querySelector('.popup_type_card');
const cardClose = popupCard.querySelector('.popup__close_type_card');
const popupAdd = document.querySelector('.profile__add');
const formCard = popupCard.querySelector('.popup__form_type_mesto');
const cardMesto = popupCard.querySelector('.popup__info_type_mesto');
const cardLink = popupCard.querySelector('.popup__info_type_link');
const buttonCard = popupCard.querySelector('.popup__button_type_add');

// Переменные попапа редактирования имени и профессии
const popupInformation = document.querySelector('.popup_type_information');
const informationClose = popupInformation.querySelector('.popup__close_type_information');
const popupOpen = document.querySelector('.profile__button');
const formInformation = popupInformation.querySelector('.popup__form_type_name');
const informationName = popupInformation.querySelector('.popup__info_type_name');
const informationJob = popupInformation.querySelector('.popup__info_type_job');
const infoName = document.querySelector('.profile__name');
const infoJob = document.querySelector('.profile__job');
const buttonInformation = popupInformation.querySelector('.popup__button_type_save');

//Переменные попапа с картинкой
const popupImage = document.querySelector('.popup_type_image');
const imageClose = popupImage.querySelector('.popup__close_type_image');
const imageOpen = popupImage.querySelector('.popup__image');
const ImageText = popupImage.querySelector('.popup__name');

const elementCards = document.querySelector('.elements');
const templateElement = document.querySelector('.element__template').content;

//функция которая создает карточку и навешивает события
function newCard(item) {
  const templateClone = templateElement.querySelector('.element').cloneNode(true);
  templateClone.querySelector('.element__image').src = item.link;
  templateClone.querySelector('.element__image').alt = item.name;
  templateClone.querySelector('.element__text').textContent = item.name;
  
  // лайк карточек
  const like = templateClone.querySelector('.element__button');
  like.addEventListener('click', function() {
    like.classList.toggle('element__button_type_like');
  });
  // удаление карточек
  templateClone.querySelector('.element__reset').addEventListener('click', function() {
    templateClone.remove();
  });
  //открытие картинки 
  const templateOpen = templateClone.querySelector('.element__image');
  templateOpen.addEventListener('click', function() {
  imageOpen.src = item.link;
  imageOpen.alt = item.name;
  ImageText.textContent = item.name;
  openModal(popupImage);
});

  return templateClone;
};
function addCards(item) {
  elementCards.prepend(newCard(item));
}
//функция,которая отрисовывает созданные карточки
initialCards.forEach(function arrays(item) {
  addCards(item);
});



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
  enableButton(buttonInformation, configForm);
  openModal(popupInformation);
});

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
  addCards(item);
  formCard.reset();
  disabledButton(buttonCard, configForm)
  closeModal(popupCard);
});
formInformation.addEventListener('submit', function(evt) {
  evt.preventDefault();
  infoName.textContent = informationName.value;
  infoJob.textContent = informationJob.value;
  closeModal(popupInformation);
});

