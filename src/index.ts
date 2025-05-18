import { GameService } from "@services/game-service.js";
import { AIService } from "@services/ai-service.js";
import { GameController } from "@controllers/game-controller.js";
import { UIController } from "@controllers/ui-controller.js";
import { InputController } from "@controllers/input-controller.js";

const ai = new AIService();
const ui = new UIController();
const game = new GameService(ai);
const controller = new GameController(game, ui);
const input = new InputController(controller);

input.init();
