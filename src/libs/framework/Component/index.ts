import { IComponent, IRouterDom } from "@framework/types";
import { random } from "@utils";

export abstract class Component implements IComponent {
  routerDom: IRouterDom;
  state: {};

  constructor(routerDom?: IRouterDom) {
    this.routerDom = routerDom;
    this.state = {};
  }

  abstract render(): string;

  _reborn() {
    const methodNames = Object.getOwnPropertyNames((this as any).__proto__);
    const deleted = ["render", "constructor"];
    const filtered = methodNames.filter(handler => !deleted.includes(handler));

    let html = this.render();

    filtered.forEach(methodName => {
      const hash = random();
      const uniqName = methodName + "_" + hash;

      const remove = methodName + "()";
      const paste = uniqName + "()";

      html = html.replace(remove, paste);

      this._registerHandler(uniqName, methodName);
    });

    this.render = () => html.trim();

    return this;
  }

  _registerHandler(uniq: string, methodName: string) {
    // window[uniq] = (this as any).__proto__[method].bind(this.routerDom);//TODO
    window[uniq] = (this as any).__proto__[methodName].bind(this);
  }

  refresh() {
    const html = this.render();
    // смотрим какой ключ и находим в дом дереве
    const element = document.querySelector("#HomePage");
    // element.remove();  

    // TODO удаляем елемент
    // смотрим какие переменные в разметке заменить на значение из стейта
    // вставляем элемент!)
  }
}
