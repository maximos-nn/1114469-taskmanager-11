import {Board} from "./components/board";
import {BoardController} from "./controllers/board";
import {Filter} from "./components/filter";
import {SiteMenu} from "./components/site-menu";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import {render} from "./utils/render";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new SiteMenu());
render(siteMainElement, new Filter(filters));

const boardComponent = new Board();
const boardController = new BoardController(boardComponent);

render(siteMainElement, boardComponent);
boardController.render(tasks);
