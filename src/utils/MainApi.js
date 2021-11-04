/* eslint-disable import/prefer-default-export */
// Api регистрации, авторизации и сохранения фильмов
const BASE_URL = 'https://api.filmsexplorer.nomoredomains.club';

function checkResponse(response) {
  return (response.ok ? response.json() : Promise.reject(String(response.status)));
}

export function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(checkResponse);
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
}

export function logOut() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  }).then(checkResponse);
}

export function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
  }).then(checkResponse);
}

export function updateUserInfo(name, email) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then(checkResponse);
}

// films

export function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
  }).then(checkResponse);
}
