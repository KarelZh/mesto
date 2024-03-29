class Card {
  constructor(data, templateSelector, handleCardClick, buttonDeleteCard, userID, likeCardApi, deleteLikeCardApi, openDeleteCard) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._idCard = data._id;
    this._userId = data.owner._id;
    this._id = userID;
    this._templateSelector = templateSelector;
    this._openImage = handleCardClick;
    this._buttonDeleteCard = buttonDeleteCard;
    this._likeCardApi = likeCardApi;
    this._deleteLikeCardApi = deleteLikeCardApi;
    this._openDeleteCard = openDeleteCard;
  };

  _getTemplate() {
    this._cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return this._cardElement;
  };
  generateCard() {
    this._element = this._getTemplate();
    this._likesCounter = this._element.querySelector('.element__like_button');
    this._likeButton = this._element.querySelector('.element__button');
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    this.updateLikes(this._likes)
    if (this._id !== this._userId) {
      this._element.querySelector('.element__reset').remove();
    }
    return this._element;
  };

  updateLikes(likes) {
    this._likesCounter.textContent = this._likes.length = likes.length;
    this._isLiked = likes.find((item) => {
      return item._id === this._id
    })
    if (this._isLiked) {
      this._likeCard()
    }else{
      this._deleteLikeCard()
    }
  }
  getId() {
    return this._idCard;
  }

  _setEventListeners() {
    this._element.querySelector('.element__reset').addEventListener('click', this._handleDeleteCard)
    this._likeButton.addEventListener('click', this._handleLikeCard);
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImage({link: this._link, name: this._name}); 
    })
  };
  _handleLikeCard = () => {
    if (this._likeButton.classList.contains('element__button_type_like')) {
      this._deleteLikeCardApi(this.getId())
    } else {
      this._likeCardApi(this.getId())
    }
  }
  _handleDeleteCard = () => {
    this._openDeleteCard(this);
  }
  _likeCard() {
    this._likeButton.classList.add('element__button_type_like');
  };
  _deleteLikeCard() {
    this._likeButton.classList.remove('element__button_type_like')
  }
  deleteCard() {
    this._element.remove();
  };
  
};

export {Card};