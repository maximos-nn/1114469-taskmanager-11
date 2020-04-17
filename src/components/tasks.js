import {AbstractComponent} from "./abstract-component";

const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}
