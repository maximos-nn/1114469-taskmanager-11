import {createElement} from "../utils/render";

const HIDDEN_CLASS = `visually-hidden`;

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Невозможно инстанцировать абстрактный класс AbstractComponent.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Необходимо реализовать абстрактный метод getTemplate().`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}
