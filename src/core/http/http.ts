import {lastIndex} from '@core/utils';

const METHODS = {GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE'};

function queryStringify(data: Record<string, unknown>) {
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

function fetch(url: string, options?: any): Promise<unknown> {
  const {method = METHODS.GET, timeout = 10000, headers = {}, data} = options || {};

  const isGet = method === METHODS.GET;
  const isData = !!data;
  const isFormdata = data instanceof FormData;

  const xhr = new XMLHttpRequest();
  const uri = isGet && isData ? `${url}${queryStringify(data)}` : url;
  const body = isFormdata ? data : JSON.stringify(data);

  const promise = new Promise((resolve, reject) => {
    xhr.open(method, uri);
    xhr.withCredentials = true;

    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.onload = function () {
      const startObject = xhr.responseText.trim().startsWith('{');
      const startArray = xhr.responseText.trim().startsWith('[');

      const endObject = xhr.responseText.trim().endsWith('}');
      const endArray = xhr.responseText.trim().endsWith(']');

      const isStartBracket = startObject || startArray;
      const isEndBracket = endObject || endArray;

      const isJson = isStartBracket && isEndBracket;
      const badResponse = !xhr.status.toString().startsWith('2');

      const done = badResponse ? reject : resolve;

      done(isJson ? JSON.parse(xhr.responseText) : xhr.responseText);
      xhr.abort();
    };

    xhr.onabort = reject;
    xhr.onerror = reject;

    xhr.timeout = timeout;
    xhr.ontimeout = reject;

    if (isGet || !data) {
      xhr.send();
    } else {
      xhr.send(body);
    }
  });

  return promise;
}

export {fetch};
