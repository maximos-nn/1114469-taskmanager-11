import {LoadMoreButton} from "../components/load-more-button";
import {NoTasks} from "../components/no-tasks";
import {Sort, SortType} from "../components/sort";
import {Task} from "../components/task";
import {TaskEdit} from "../components/task-edit";
import {Tasks} from "../components/tasks";
import {render, replace, remove} from "../utils/render";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
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

    this._noTasksComponent = new NoTasks();
    this._sortComponent = new Sort();
    this._tasksComponent = new Tasks();
    this._loadMoreButtonComponent = new LoadMoreButton();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      remove(this._loadMoreButtonComponent); // !!!
      render(boardElement, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        // const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
        renderTasks(taskListElement, sortedTasks.slice(prevTasksCount, showingTasksCount)); // !!!
        // renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    const boardElement = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(boardElement, this._noTasksComponent);
      return;
    }

    render(boardElement, this._sortComponent);
    render(boardElement, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    let sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType()); // !!!
    renderTasks(taskListElement, sortedTasks.slice(0, showingTasksCount)); // !!!
    // renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
      sortedTasks = getSortedTasks(tasks, sortType); // !!!
      // const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);
      taskListElement.innerHTML = ``;
      renderTasks(taskListElement, sortedTasks.slice(0, showingTasksCount)); // !!!
      // renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
  }
}
