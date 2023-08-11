class Card {
  constructor(data, templateSelector, handleCardClick, deleteCardClick, buttonDeleteCard, closeCardClick, userID, deleteCardId, likeCardApi, deleteLikeCardApi) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._idCard = data._id;
    this._userId = data.owner._id;
    this._id = userID;
    this._templateSelector = templateSelector;
    this._openImage = handleCardClick;
    this._openDeleteCard = deleteCardClick;
    this._buttonDeleteCard = buttonDeleteCard;
    this._closeCardClick = closeCardClick;
    this._deleteCardId = deleteCardId;
    this._likeCardApi = likeCardApi;
    this._deleteLikeCardApi = deleteLikeCardApi;
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
    this.updateLikes(this._likes)
    //this._element.querySelector('.element__like_button').textContent = this._likes.length;
    if (this._id !== this._userId) {
      this._element.querySelector('.element__reset').remove();
    }
    return this._element;
  };

  updateLikes(likes) {
    this._element.querySelector('.element__like_button').textContent = this._likes.length = likes.length;
    if (likes.find((item) => {
      return item._id === this._id
    })) {
      this._likeCard()
    }else{
      this._deleteLikeCard()
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', () => {
      if (this._element.querySelector('.element__button').classList.contains('element__button_type_like')) {
        this._deleteLikeCardApi(this._idCard)
      } else {
        this._likeCardApi(this._idCard)
      }
    });
    this._element.querySelector('.element__reset').addEventListener('click', () => {
      this._openDeleteCard();
      this._buttonDeleteCard.addEventListener('click', () => {
        this._deleteCardId(this._idCard);
        this._deleteCard();
        this._closeCardClick();
      })
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImage({link: this._link, name: this._name}); 
    })
       
    
  };
  _likeCard() {
    this._element.querySelector('.element__button').classList.add('element__button_type_like');
  };
  _deleteLikeCard() {
    this._element.querySelector('.element__button').classList.remove('element__button_type_like')
  }
  _deleteCard() {
    this._element.remove();
  };
  
};

export {Card};