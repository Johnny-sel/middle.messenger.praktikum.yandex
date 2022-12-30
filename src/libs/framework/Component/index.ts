import { IComponent, IRouterDOM } from '../types';
import { random } from "../../utils/";

export class Component implements IComponent {
  routerContext: IRouterDOM;
  state: {};

  constructor(routerContext?: IRouterDOM) {
    this.routerContext = routerContext;
    this.state = {};
  }

  reborn() {
    // делаем все методы компоненты уникальными,
    // кроме "render", "constructor" (пока что, со временем может еще добавиться)
    // для того, что бы не было конфликтов, если разработчик объявил метод в разных компонентах
    // с одним и тем же именем

    const methods = Object.getOwnPropertyNames((this as any).__proto__);
    const deleted = ["render", "constructor"];
    const filtered = methods.filter(handler => !deleted.includes(handler));

    let html = this.render();

    filtered.forEach(methodName => {
      const hash = random();
      const uniqName = methodName + "_" + hash;

      const remove = methodName + "()";
      const paste = uniqName + "()";

      html = html.replace(remove, paste);

      // регистрируем в глобальном объекте метод с уникальным именем
      this._registerHandler(uniqName, methodName);
    });

    this.render = () => html.trim();

    return this;
  }

  _registerHandler(uniq: string, method: string) {
    // window[uniq] = (this as any).__proto__[method].bind(this.routerContext);//TODO
    window[uniq] = (this as any).__proto__[method].bind(this);
  }

  render() {
    return ''
  }
}
