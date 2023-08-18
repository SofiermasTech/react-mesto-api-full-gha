import { checkResponse } from "../utils/checkResponse.js";
export const BASE_URL = 'https://api.volserma.nomoreparties.co';

const headers = {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
};

export function register({ email, password }) {
   return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password })
   })
      .then(checkResponse)
};

export function authorize({ email, password }) {
   return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password })
   })
      .then(checkResponse)
};

export function checkToken(token) {
   return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         ...headers,
         authorization: `Bearer ${token}`,
      }
   })
      .then(checkResponse)
};