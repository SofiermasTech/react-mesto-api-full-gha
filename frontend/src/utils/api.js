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
         .then(res => { return this._parseResponse(res); });
   }

   //добавление
   addNewCard(data) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      })
         .then(res => this._parseResponse(res));
   }

   //удаление
   deleteCard(cardId) {
      const token = localStorage.getItem('token');
      return fetch(`${this._url}/cards/${cardId}`, {
         headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
         },
         method: 'DELETE'
      })
         .then(res => this._parseResponse(res));
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
         .then(res => this._parseResponse(res));
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
         .then(res => { return this._parseResponse(res); })
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
         .then(res => this._parseResponse(res));
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
         .then(res => { return this._parseResponse(res) });
   }

}

const api = new Api({
   /*
   url: 'https://mesto.nomoreparties.co/v1/cohort-64',
   headers: {
      authorization: '4540ef64-f0c3-404e-8fd0-3e3d77e1eef2',
      'Content-Type': 'application/json'
   } */
   url: 'http://localhost:3000',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
   }
});

export default api;
