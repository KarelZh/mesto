class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImage = handleCardClick;
  };

  _getTemplate() {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return this._cardElement;
  };
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;

    return this._element;
  };

  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.element__reset').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImage({link: this._link, name: this._name}); 
    })
       
    
  };
  _likeCard() {
    this._element.querySelector('.element__button').classList.toggle('element__button_type_like');
  };
  _deleteCard() {
    this._element.remove();
  };
  
};

export {Card};
