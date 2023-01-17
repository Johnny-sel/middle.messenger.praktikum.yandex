import {fetch} from '@core/http';

const api = {
  baseUrl: 'https://ya-praktikum.tech/api/v2',

  headers: {
    'Content-Type': 'application/json',
  },

  get: (url: string, data?: unknown) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'GET', headers, data});
  },

  post: (url: string, data?: unknown) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'POST', headers, data});
  },

  put: (url: string, data?: unknown) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'PUT', headers, data});
  },

  delete: (url: string, data?: unknown) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'DELETE', headers, data});
  },
};

export {api};
