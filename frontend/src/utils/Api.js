class Api {
  constructor({ address, token }) {
    this._baseUrl = address;
    this._headers = {
      "content-type": "application/json",
      Authorization: token,
    };
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => res.json()); // Lee y transforma la respuesta en datos JSON y se lo pasa al siguiente .then
  }

  // obtiene los datos completos de las tarjetas
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => res.json());
  }

  // pasar los datos del formulario a la API
  updateProfile(name, about) {
    // espera 2 valores!
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => res.json());
  }

  postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => res.json());
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => res.json());
  }

  putLikesCard(cardId) {
    console.log("put Likes");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => res.json());
  }

  removeLikesCard(cardId) {
    console.log("remove Likes");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => res.json());
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => res.json());
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.putLikesCard(cardId);
    } else {
      return this.removeLikesCard(cardId);
    }
  }
}

const api = new Api({
  address: "https://around-api.es.tripleten-services.com/v1",
  token: "b618c936-6ee8-401d-bb34-9c0666b34a28",
});

export default api;
