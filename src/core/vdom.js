import { isArr } from '@core/utils';

const list = [
  'div',
  'p',
  'a',
  'span',
  'img',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'main',
  'header',
  'footer',
  'aside',
  'section',
  'article',
  'input',
  'form',
  'button',
  'label',
];
const tags = {};

(function createVirtualNode() {
  for (let i = 0; i < list.length; i++) {
    const tag = list[i];

    tags[tag] = (...args) => {
      let attrs = '';
      let children = [];

      if (args.length > 2) {
        throw new Error('You pass many arguments to component, more then 2');
      }

      if (args.length === 1) {
        attrs = isArr(args[0]) ? '' : args[0];
        children = isArr(args[0]) ? args[0] : [];
      }

      if (args.length === 2) {
        attrs = args[0];
        children = args[1];
      }

      return { tag, attrs, children };
    };
  }
})();

export const span = tags['span'];
export const p = tags['p'];
export const a = tags['a'];

export const div = tags['div'];
export const img = tags['img'];

export const h1 = tags['h1'];
export const h2 = tags['h2'];
export const h3 = tags['h3'];
export const h4 = tags['h4'];
export const h5 = tags['h5'];
export const h6 = tags['h6'];

export const main = tags['main'];
export const header = tags['header'];
export const footer = tags['footer'];
export const aside = tags['aside'];
export const article = tags['article'];
export const section = tags['section'];

export const button = tags['button'];
export const input = tags['input'];
export const form = tags['form'];
export const label = tags['label'];
