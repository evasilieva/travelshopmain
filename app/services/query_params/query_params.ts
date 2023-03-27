// Модуль для получения параметров запроса
// see https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript

const urlSearchParams = new URLSearchParams(window.location.search);
export const query_params = Object.fromEntries(urlSearchParams.entries());
