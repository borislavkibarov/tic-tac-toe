import { GameService, AIService, BoardService } from "@services/services.js";
import { GameController, UIController, InputController } from "@controllers/controllers.js";

const ai = new AIService();
const ui = new UIController();
const board = new BoardService();
const game = new GameService(ai, board);
const controller = new GameController(game, ui);
const input = new InputController(controller);

input.init();
