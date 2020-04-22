import {AbstractComponent} from "./abstract-component";

export class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Абстрактный метод recoveryListeners не реализован.`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    this.recoveryListeners();
  }
}
