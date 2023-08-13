export function checkResponse(res) {
   return res.ok
      ? res.json()
      : Promise.reject(`Ошибка ${res.status}`);
}