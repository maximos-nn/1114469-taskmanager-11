import {createSiteMenuTemplate} from "./components/site-menu";
import {createSortingTemplate} from "./components/sorting";
import {createFilterTemplate} from "./components/filter";
import {createTaskTemplate} from "./components/task";
import {createTaskEditTemplate} from "./components/task-edit";
import {createLoadMoreButtonTemplate} from "./components/load-more-button";
import {createBoardTemplate} from "./components/board";

const TASK_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate());
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}
render(boardElement, createLoadMoreButtonTemplate());
