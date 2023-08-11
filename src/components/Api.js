class Api {
  constructor(options) {
    this._options = options;
  }
  _checkResponse(res) {
    if (res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  infoUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  initialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    }).then(this._checkResponse)
  }
  
  newInfoUser(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this._checkResponse)
  }

  generateCard(mesto, link, likes) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: mesto,
        link: link,
        likes: likes
      }),
    }).then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  likeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  deleteLikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  addAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then(this._checkResponse)
  }
}

export {Api};
