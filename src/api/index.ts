import {fetch} from '@core/http';
import {API} from './types';

const api: API = {
  baseUrl: 'https://ya-praktikum.tech/api/v2',
  headers: {'Content-Type': 'application/json'},

  get: (url, data) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'GET', headers, data});
  },

  post: (url, data) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'POST', headers, data});
  },

  put: (url, data) => {
    let {headers} = api;
    if (data instanceof FormData) {
      headers = {} as any;
    }
    return fetch(api.baseUrl + url, {method: 'PUT', headers, data});
  },

  delete: (url, data) => {
    const {headers} = api;
    return fetch(api.baseUrl + url, {method: 'DELETE', headers, data});
  },
};

export {api};
