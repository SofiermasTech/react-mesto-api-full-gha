//import { BASE_URL } from './auth';

class Api {
   constructor(config) {
      this._url = config.url;
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
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards`, {
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            //'Authorization': `Bearer ${jwt}`,
         },
      })
         .then(this._parseResponse);
   }

   //добавление
   addNewCard({ name, link }) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            name,
            link
         })
      })
         .then(this._parseResponse);
   }


   //удаление
   deleteCard(cardId) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards/${cardId}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
      })
         .then(this._parseResponse);
   }

   //лайк-deleted like
   changeLikeCardStatus(cardId, isLiked) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards/${cardId}/likes`, {
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         method: `${!isLiked ? 'DELETE' : 'PUT'}`,

      })
         .then(this._parseResponse);
   }


   /* Запросы на сервер для пользователя */

   //информация о пользователе с сервера
   getUserInfo() {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/users/me`, {
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         method: 'GET'
      })
         .then(this._parseResponse)
   }

   //изменение информации через попап
   setUserInfo(data) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/users/me`, {
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         method: 'PATCH',
         body: JSON.stringify({
            name: data.name,
            about: data.about
         })
      })
         .then(this._parseResponse);
   }

   //редактирование аватара
   setUserAvatar(data) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/users/me/avatar`, {
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         method: 'PATCH',
         body: JSON.stringify({ avatar: data.avatar })
      })
         .then(this._parseResponse);
   }

}

const api = new Api({
   url: 'https://api.volserma.nomoreparties.co',
});

export default api;
