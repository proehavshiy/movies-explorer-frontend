/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */

function filterResults(dataArray, key) {
  if (!Array.isArray(dataArray)) {
    return;
  }
  const searchKey = transformString(key);

  return dataArray.reduce((acc, curr) => {
    // объединенное название для поиска и кириллицей, и латиницей
    const movieNameENRU = transformString(curr.nameRU.concat(curr.nameEN));
    movieNameENRU.includes(searchKey) ? acc.push(curr) : acc;
    return acc;
  }, []);
}

function transformString(string) {
  const forbiddenSymbols = [',', '.', '-', ':', ';', '!', '?', '«', '»', '*', '@', '#', '$', '%', '&', '^', '(', ')', '+', '=', ' '];
  const arrayFromString = string.toLowerCase().trim().split('');

  const filteredArray = arrayFromString.reduce((acc, curr) => {
    forbiddenSymbols.includes(curr) ? acc : acc.push(curr);
    return acc;
  }, []);

  return filteredArray.join('');
}

// function defineAlphabetType(string) {
//   const regexRU = /^(?:(?![a-zA-Z]))[а-яА-ЯёЁ]^(?:(?![a-zA-Z]))/gi;
//   const regexEN = /^(?:(?![а-яА-ЯёЁ]))[a-zA-Z]^(?:(?![а-яА-ЯёЁ]))/gi;
//   if (regexRU.test(string)) {
//     console.log('regexRU :', 'ru');
//     return 'ru';
//   }
//   if (regexEN.test(string)) {
//     console.log('regexEN:', 'en');
//     return 'en';
//   }
// }

export default filterResults;
