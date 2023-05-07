// Добавление массива с карточками
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
  //Переменные попапа создания карточек
const popupCards = document.querySelector('.popup_type_add');
const popupReset = popupCards.querySelector('.popup__close_type_reset');
const popupAdd = document.querySelector('.profile__add');
const infoMesto = popupCards.querySelector('.popup__form_type_mesto');
const inputMesto = popupCards.querySelector('.popup__info_type_mesto');
const inputLink = popupCards.querySelector('.popup__info_type_link');

// Переменные попапа редактирования имени и профессии
const popupElement = document.querySelector('.popup_type_red');
const popupClose = popupElement.querySelector('.popup__close_type_closed');
const popupOpen = document.querySelector('.profile__button');
const infoSave = popupElement.querySelector('.popup__form_type_name');
const inputName = popupElement.querySelector('.popup__info_type_name');
const inputJob = popupElement.querySelector('.popup__info_type_job');
const infoName = document.querySelector('.profile__name');
const infoJob = document.querySelector('.profile__job');

//Переменные попапа с картинкой
const popupImage = document.querySelector('.popup_type_open');
const popupExit = popupImage.querySelector('.popup__close_type_exit');
const imageOpen = popupImage.querySelector('.popup__image');
const popupText = popupImage.querySelector('.popup__name');



//функция которая создает карточку и навешивает события
function newCard(item) {
  const elementCards = document.querySelector('.elements');
  const templateElement = document.querySelector('.element__template').content;
  const templateClone = templateElement.querySelector('.element').cloneNode(true);
  templateClone.querySelector('.element__image').src = item.link;
  templateClone.querySelector('.element__image').alt = item.name;
  templateClone.querySelector('.element__text').textContent = item.name;
  elementCards.prepend(templateClone);
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
  const templateOpen = document.querySelector('.element__image');
  templateOpen.addEventListener('click', function() {
  imageOpen.src = item.link;
  imageOpen.alt = item.name;
  popupText.textContent = item.name;
  openModal(popupImage);
});

  return templateClone;
};
//функция,которая отрисовывает созданные карточки
initialCards.forEach(function addCard(item) {
  newCard(item);
});



function openModal(modal) {
  modal.classList.add('popup_opened');
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;
};

function closeModal(modal) {
  modal.classList.remove('popup_opened');
};

popupOpen.addEventListener('click', () => openModal(popupElement));
popupAdd.addEventListener('click', () => openModal(popupCards));
popupClose.addEventListener('click', () => closeModal(popupElement));
popupReset.addEventListener('click', () => closeModal(popupCards));
popupExit.addEventListener('click', () => closeModal(popupImage));



infoMesto.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const name = inputMesto.value;
  const link = inputLink.value;
  const item = { name, link };
  newCard(item);
  closeModal(popupCards);
});
infoSave.addEventListener('submit', function(evt) {
  evt.preventDefault();
  infoName.textContent = inputName.value;
  infoJob.textContent = inputJob.value;
  closeModal(popupElement);
});

