/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-promise-reject-errors */
const BASE_REQUEST_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BASE_URL = 'https://api.nomoreparties.co';

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

export function getMovies() {
  return fetch(BASE_REQUEST_URL, {
    method: 'GET',
    // credentials: 'include',
  }).then(checkResponse);
}
