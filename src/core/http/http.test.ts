import {fetch, queryStringify, onload} from './http';
describe('http', () => {
  const data = {id: 1, name: 'Evgenii', surname: 'Seleznev'};
  const formData = new FormData();

  const xhr = Object.defineProperties(new XMLHttpRequest(), {
    status: {writable: true},
    responseText: {writable: true},
  });

  test('queryStringify should be return url query string from object', () => {
    const queryString = queryStringify(data);
    expect(queryString).toBe('?id=1&name=Evgenii&surname=Seleznev');
  });

  test('fetch function should return promise', async () => {
    const get = async () => {
      await fetch('https://google.com');
    };

    const getWithData = async () => {
      await fetch('https://google.com', {data: data});
    };

    const getWithFormData = async () => {
      await fetch('https://google.com', {data: formData});
    };

    const post = async () => {
      await fetch('https://google.com', {method: 'POST'});
    };

    const postWidthData = async () => {
      await fetch('https://google.com', {method: 'POST', data});
    };

    const postWidthHeaders = async () => {
      await fetch('https://google.com', {
        method: 'POST',
        data,
        headers: {'Content-Type': 'application/json'},
      });
    };

    const onloadCallbackStatus200 = () => {
      (xhr as any).status = 200;
      (xhr as any).responseText = 'simple text';

      const resolve = (value: unknown) => value;
      const reject = (value: unknown) => value;

      onload.call(xhr, resolve, reject);
    };

    const onloadCallbackStatusNot200 = () => {
      (xhr as any).status = 400;
      (xhr as any).responseText = 'simple text';

      const resolve = (value: unknown) => value;
      const reject = (value: unknown) => value;
      onload.call(xhr, resolve, reject);
    };

    const onloadCallbackResponseText = () => {
      (xhr as any).responseText = 'simple text';

      const resolve = (value: unknown) => value;
      const reject = (value: unknown) => value;
      onload.call(xhr, resolve, reject);
    };

    const onloadCallbackResponseJson = () => {
      (xhr as any).responseText = '{test: text}';

      const resolve = (value: unknown) => value;
      const reject = (value: unknown) => value;
      onload.call(xhr, resolve, reject);
    };

    const onloadCallbackResponseArray = () => {
      (xhr as any).responseText = '[{test: text}]';

      const resolve = (value: unknown) => value;
      const reject = (value: unknown) => value;
      onload.call(xhr, resolve, reject);
    };

    expect(get).not.toThrow();
    expect(getWithData).not.toThrow();
    expect(getWithFormData).not.toThrow();

    expect(post).not.toThrow();
    expect(postWidthData).not.toThrow();
    expect(postWidthHeaders).rejects.toBeCalled();

    expect(onloadCallbackStatus200).not.toThrow();
    expect(onloadCallbackStatusNot200).not.toThrow();

    expect(onloadCallbackResponseText).not.toThrow();
    expect(onloadCallbackResponseJson).toThrow();
    expect(onloadCallbackResponseArray).toThrow();
  });
});
