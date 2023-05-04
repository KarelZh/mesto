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
// template


const elementCards = document.querySelector('.elements');

initialCards.map(function addCards(item) {
  const templateElement = document.querySelector('.element__template').content;
  const cards = templateElement.querySelector('.element').cloneNode(true);
  cards.querySelector('.element__image').src = item.link;
  cards.querySelector('.element__image').alt = item.name;
  cards.querySelector('.element__text').textContent = item.name;
  elementCards.append(cards);
  //удаление карточек
  cards.querySelector('.element__reset').addEventListener('click', () => {
    cards.remove();
  });
  return cards;
});



// Лайк карточек
const like = document.querySelectorAll('.element__button');
like.forEach(function(itemLike) {
  itemLike.addEventListener('click', function() {
    itemLike.classList.toggle('element__button_type_like');
  });  
});

// Переменные попапа редактирования имени и профессии
const popupElement = document.querySelector('.popup_type_red');
const popupClose = popupElement.querySelector('.popup__close_type_closed');
const popupOpen = document.querySelector('.profile__button');
const infoSave = popupElement.querySelector('.popup__form_type_name');
const inputName = popupElement.querySelector('.popup__info_type_name');
const inputJob = popupElement.querySelector('.popup__info_type_job');
const infoName = document.querySelector('.profile__name');
const infoJob = document.querySelector('.profile__job');

//Переменные попапа создания карточек
const popupCards = document.querySelector('.popup_type_add');
const popupReset = popupCards.querySelector('.popup__close_type_reset');
const popupAdd = document.querySelector('.profile__add');
const infoMesto = popupCards.querySelector('.popup__form_type_mesto');
const inputMesto = popupCards.querySelector('.popup__info_type_mesto');
const inputLink = popupCards.querySelector('.popup__info_type_link');



function openModal(modal) {
    modal.classList.add('popup_opened');
    inputName.value = infoName.textContent;
    inputJob.value = infoJob.textContent;
};

function closeModal(modal) {
    modal.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    infoName.textContent = inputName.value;
    infoJob.textContent = inputJob.value;
    closeModal(popupElement);
};


popupOpen.addEventListener('click', () => openModal(popupElement));
popupAdd.addEventListener('click', () => openModal(popupCards));
popupClose.addEventListener('click', () => closeModal(popupElement));
popupReset.addEventListener('click', () => closeModal(popupCards));
infoSave.addEventListener('submit', handleFormSubmit);
