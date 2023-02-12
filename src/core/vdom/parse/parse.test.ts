import {parseAttrs} from '../';

describe('Parser', () => {
  test('Function parseAttrs should be return object of html attrubite tag', () => {
    const rawString1 = `
      s=font-size:20;
      c=title;
      v=mail@google.com;
      n=email;
      t=email;
      p=Enter email;
      pt=pattern;
      di=;
      f=blockid;
      h=http://mail.ru;
      a=test.php;
      req=;
    `;

    const result1 = {
      style: 'font-size:20',
      class: 'title',
      value: 'mail@google.com',
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
      pattern: 'pattern',
      disabled: '',
      required: '',
      for: 'blockid',
      href: 'http://mail.ru',
      action: 'test.php',
    };

    const rawString2 = `
      c=image_preview;
      src=https://google.com/images/avatar.png;
      alt=description image
    `;

    const result2 = {
      class: 'image_preview',
      src: 'https://google.com/images/avatar.png',
      alt: 'description image',
    };

    expect(parseAttrs('')).toEqual({});
    expect(parseAttrs(rawString1)).toEqual(result1);
    expect(parseAttrs(rawString2)).toEqual(result2);
  });
});
