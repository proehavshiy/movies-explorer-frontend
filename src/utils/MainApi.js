/* eslint-disable prefer-promise-reject-errors */
// Api регистрации, авторизации и сохранения фильмов
const BASE_URL = 'https://api.filmsexplorer.nomoredomains.club';

function checkResponse(response) {
  // return (response.ok ? response.json() : Promise.reject(String(response.status)));

  // успешный ответ
  if (response.ok) {
    return response.json()
      .then((successReqData) => ({
        data: successReqData,
        statusCode: String(response.status),
        result: 'success',
      }));
  }
  // неуспешный ответ
  return response.json()
    .then((failedReqData) => Promise.reject({
      data: failedReqData,
      statusCode: String(response.status),
      result: 'error',
    }));
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

export function saveMovie(
  nameRU,
  nameEN,
  description,
  director,
  country,
  year,
  duration,
  image,
  trailer,
  thumbnail,
  movieId,
) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameRU,
      nameEN,
      description,
      director,
      country,
      year,
      duration,
      image,
      trailer,
      thumbnail,
      movieId,
    }),
  }).then(checkResponse);
}

export function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
  }).then(checkResponse);
}
