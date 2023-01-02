import { isArr } from '@core/utils';

const list = ['div', 'p', 'span', 'img', 'button', 'h1', 'h2', 'h3', 'h4'];
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

export const button = tags['button'];
export const span = tags['span'];
export const p = tags['p'];

export const div = tags['div'];
export const img = tags['img'];

export const h1 = tags['h1'];
export const h2 = tags['h2'];
export const h3 = tags['h3'];
export const h4 = tags['h4'];
