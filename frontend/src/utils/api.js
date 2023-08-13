class Api {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
   }

   _parseResponse(res) {
      if (res.ok) {
         console.log(res);
         return res.json();
      } else {
         return Promise.reject(`код ошибки: ${res.status}`);
      }
   }


   /* Запросы на сервер для карточек */

   //получение 
   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers
      })
         .then(res => { return this._parseResponse(res); });
   }

   //добавление
   addNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({ 
            name: data.name, 
            link: data.link })
      })
         .then(res => this._parseResponse(res));
   }

   //удаление
   deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
         headers: this._headers,
         method: 'DELETE'
      })
         .then(res => this._parseResponse(res));
   }

   //лайк-deleted like
   changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
         headers: this._headers,
         method: `${!isLiked ? 'DELETE' : 'PUT'}`,
         
      })
         .then(res => this._parseResponse(res));
   }


   /* Запросы на сервер для пользователя */

   //информация о пользователе с сервера
   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers,
         method: 'GET'
      })
         .then(res => { return this._parseResponse(res); })
   }

   //изменение информации через попап
   setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers,
         method: 'PATCH',
         body: JSON.stringify({
            name: data.name,
            about: data.about
         })
      })
         .then(res => this._parseResponse(res));
   }

   //редактирование аватара
   setUserAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         headers: this._headers,
         method: 'PATCH',
         body: JSON.stringify({ avatar: data.avatar })
      })
         .then(res => { return this._parseResponse(res) });
   }

}

const api = new Api({
   url: 'https://mesto.nomoreparties.co/v1/cohort-64',
   headers: {
      authorization: '4540ef64-f0c3-404e-8fd0-3e3d77e1eef2',
      'Content-Type': 'application/json'
   }

});

export default api;