import {lastIndex} from '@core/utils';

const METHODS = {GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE'};

function queryStringify(data: object) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  let str = '?';

  const arr = Object.entries(data);

  arr.forEach(([key, value], index) => {
    str = str + `${key}=${value}`;
    if (index !== lastIndex(arr)) {
      str = str + '&';
    }
  });
}

function fetch(url: string, options?: any): Promise<any> {
  const {method = METHODS.GET, timeout = 10000, headers = {}, data, json} = options || {};

  const isGet = method === METHODS.GET;
  const isData = !!data;

  const xhr = new XMLHttpRequest();
  const uri = isGet && isData ? `${url}${queryStringify(data)}` : url;

  const promise = new Promise((resolve, reject) => {
    xhr.open(method, uri);

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = function () {
      resolve(json ? JSON.parse(xhr.responseText) : xhr.responseText);
      xhr.abort();
    };

    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.timeout = timeout;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data));
    }
  });

  return promise;
}

function testApi() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((v) => console.log('[GET] test api value: ', v))
    .catch((e) => console.log('[GET] test api error', e))
    .finally(() => console.log('[GET] test api finally'));

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    data: {title: 'foo', body: 'bar', userId: 1},
    headers: {'Content-type': 'application/json; charset=UTF-8'},
  })
    .then((v) => console.log('[POST] test api value: ', v))
    .catch((e) => console.log('[POST] test api error', e))
    .finally(() => console.log('[POST] test api finally'));
}

export {fetch, testApi};
