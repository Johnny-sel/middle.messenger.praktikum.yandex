import {fetch} from '@api';

const api = {
  baseUrl: 'https://ya-praktikum.tech/api/v2',

  headers: {
    'Content-Type': 'application/json',
  },

  get: (url: string, data?: unknown) => {
    return fetch(api.baseUrl + url, {data, headers: api.headers});
  },

  post: (url: string, data?: unknown, json = true) => {
    return fetch(api.baseUrl + url, {method: 'POST', headers: api.headers, json, data});
  },

  put: (url: string, data?: unknown, json = true) => {
    return fetch(api.baseUrl + url, {method: 'PUT', headers: api.headers, json, data});
  },

  delete: (url: string, data?: unknown, json = true) => {
    return fetch(api.baseUrl + url, {method: 'DELETE', headers: api.headers, json, data});
  },
};

export {api};
