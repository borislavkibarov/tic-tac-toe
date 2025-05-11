import { GameService } from "@services/game-service.js";
import { AIService } from "@services/ai-service.js";
import { GameOrchestrator } from "@controllers/game-orchestrator.js";
import { UIController } from "@controllers/ui-controller.js";
import { InputController } from "@controllers/input-controller.js";

const ai = new AIService();
const ui = new UIController();
const game = new GameService(ai);
const orchestrator = new GameOrchestrator(game, ui);
const input = new InputController(orchestrator);

input.init();
