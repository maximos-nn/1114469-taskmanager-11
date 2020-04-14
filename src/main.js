import Board from "./components/board";
import Filter from "./components/filter";
import LoadMoreButton from "./components/load-more-button";
import SiteMenu from "./components/site-menu";
import Sort from "./components/sort";
import Task from "./components/task";
import TaskEdit from "./components/task-edit";
import Tasks from "./components/tasks";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import {render} from "./utils";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditElement, taskElement);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskElement, taskEditElement);
  };

  const taskElement = new Task(task).getElement();
  const editButton = taskElement.querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditElement = new TaskEdit(task).getElement();
  const editForm = taskEditElement.querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskElement);
};

const renderBoard = (boardElement, tasks) => {
  render(boardElement, new Sort().getElement());
  render(boardElement, new Tasks().getElement());

  const taskListElement = boardElement.querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => renderTask(taskListElement, task));

  const loadMoreButtonComponent = new LoadMoreButton();
  const loadMoreButton = loadMoreButtonComponent.getElement();
  render(boardElement, loadMoreButton);

  loadMoreButton.addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreButton.remove();
      loadMoreButtonComponent.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new SiteMenu().getElement());
render(siteMainElement, new Filter(filters).getElement());

const boardElement = new Board().getElement();
render(siteMainElement, boardElement);
renderBoard(boardElement, tasks);
