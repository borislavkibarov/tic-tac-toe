import { GameService, AIService } from "@services/services.js";
import { GameController, UIController, InputController } from "@controllers/controllers.js";

const ai = new AIService();
const ui = new UIController();
const game = new GameService(ai);
const controller = new GameController(game, ui);
const input = new InputController(controller);

input.init();
