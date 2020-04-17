import {AbstractComponent} from "./abstract-component";

const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

export class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
