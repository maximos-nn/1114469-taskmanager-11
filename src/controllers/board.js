import {LoadMoreButton} from "../components/load-more-button";
import {NoTasks} from "../components/no-tasks";
import {Sort, SortType} from "../components/sort";
import {TaskController} from "./task";
import {Tasks} from "../components/tasks";
import {render, remove} from "../utils/render";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  });
};

const getSortedTasks = (tasks, sortType) => {
// const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = tasks.slice(); // !!!
  // let sortedTasks = [];
  // const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks.sort((a, b) => a.dueDate - b.dueDate); // !!!
      // sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks.sort((a, b) => b.dueDate - a.dueDate); // !!!
      // sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    // case SortType.DEFAULT:
    //   sortedTasks = showingTasks;
    //   break;
  }

  return sortedTasks; // !!!
  // return sortedTasks.slice(from, to);
};

export class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._sortedTasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasks();
    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._loadMoreButtonComponent = new LoadMoreButton();
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const boardElement = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(boardElement, this._noTasksComponent);
      return;
    }

    render(boardElement, this._sortComponent);
    render(boardElement, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    this._sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType()); // !!!
    this._showedTaskControllers = renderTasks(taskListElement, this._sortedTasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange); // !!!
    // renderTasks(taskListElement, tasks.slice(0, showingTasksCount));

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    remove(this._loadMoreButtonComponent); // !!!
    render(this._container.getElement(), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      // const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
      const newTasks = renderTasks(taskListElement, this._sortedTasks.slice(prevTasksCount, this._showingTasksCount), this._onDataChange, this._onViewChange); // !!!
      // renderTasks(taskListElement, sortedTasks);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._sortedTasks.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }
    this._sortedTasks = [].concat(this._sortedTasks.slice(0, index), newData, this._sortedTasks.slice(index + 1));
    taskController.render(this._sortedTasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._sortedTasks = getSortedTasks(this._tasks, sortType); // !!!
    // const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();
    taskListElement.innerHTML = ``;
    this._showedTaskControllers = renderTasks(taskListElement, this._sortedTasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange); // !!!
    // renderTasks(taskListElement, sortedTasks);
    this._renderLoadMoreButton();
  }
}
