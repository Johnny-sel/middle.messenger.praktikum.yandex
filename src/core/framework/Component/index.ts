import { IComponent, IRouterDom } from "@framework/types";
import { random, last, findMatchBetWeen, valueObjectFromString, lastIndex } from "@utils";


export abstract class Component implements IComponent {
  routerDom: IRouterDom;
  state: any;
  html: string;
  props: any;

  key: string; //id

  constructor(routerDom?: IRouterDom, props?: any) {
    this.routerDom = routerDom;
    this.state = {};
    this.props = props;
    this.key = random();
  }

  abstract render(): string;

  componentDidMount?(): void;


  init() {
    if (this.componentDidMount) {
      this.componentDidMount();
    }

    this._registerComponent();


    return this._formatHtml();
  };

  _registerComponent() {
    const path = window.location.pathname;
    this.routerDom.components.push({ [path]: this });
  }

  setState(obj: Object): void {
    this.state = { ...this.state, ...obj };

    this._injectStateValuesInHTML(obj);
  }

  _injectStateValuesInHTML(obj: Object) {
    const props = Object.keys(obj);
    console.log('props:', props)

    props.forEach(prop => {
      const element = document.querySelector(`[data-state='#${this.key}#${prop}']`);
      element.textContent = this.state[prop];
    })
  }

  _formatHtml() {
    this._addKeysInHTML();
    this._replaceStateValuesInHTML();

    const prototype = Object.getPrototypeOf(this);
    const names = Object.getOwnPropertyNames(prototype); // список названий методов у компоненты

    const removed = ["constructor", "render", "init", "dispose"];
    const methods = names.filter(name => removed.includes(name) === false);

    const dirtyHTML = this.render();
    const cleanHTML = this._replaceMethodsInHTML(methods, dirtyHTML);

    return cleanHTML;
  }

  _replaceStateValuesInHTML() {
    let componentHtml = this._lastRender();
    let html = componentHtml ? this._lastRender() : this.render();

    while (true) {
      const { match, innerValue } = findMatchBetWeen(html, '{-{', '}-}');
      if (match === undefined) {
        break;
      }

      const { match: matchKey, innerValue: key } = findMatchBetWeen(match, '#', '#');
      if (matchKey === undefined) {
        break;
      }

      const indexMatch = html.indexOf(match);
      let count = indexMatch;

      while (true) {
        if (html[count] === '>') {
          html = html.substring(0, count) + ` data-state="${innerValue.replace(" ", "").trim()}"> ` + html.substring(count + 2, html.length);
          break;
        };
        count--;
      }

      if (key === this.key) {
        const paste = valueObjectFromString(innerValue, this.state);
        html = html.replace(match, paste);
      }
    }

    this.render = () => html;
  }



  _replaceMethodsInHTML(methods: string[], html: string) {
    methods.forEach((method: string) => {
      const uniqName = method + "_" + random();
      const remove = method + "()";
      const paste = uniqName + "()";

      html = html.replace(remove, paste);
      this._registeringHandler(uniqName, method);
    });

    return html.trim();
  }

  _addKeysInHTML() {
    let html = this.render();

    while (true) {
      const { match } = findMatchBetWeen(html, '{{', '}}');
      if (!match) break;
      const { match: matchKey } = findMatchBetWeen(match, '#', '#');
      if (matchKey) break;

      const removeBraсkets = match.substring(2, match.length - 2)
      const pasted = `{-{#${this.key}#${removeBraсkets}}-}`;

      html = html.replace(match, pasted);
    }

    this.render = () => html;
    this._lastRender = () => html;
  }

  _registeringHandler(uniq: string, nameMethod: string) {
    window[uniq] = (this as any).__proto__[nameMethod].bind(this);
  }

  _registeringInit(uniq: string, nameMethod: string) {
    // window[uniq] = (this as any).__proto__[nameMethod].bind(this);
  }

  _lastRender() {
    return ''
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

