import { GameController } from "@controllers/controllers.js";
import { GameService } from "@services/services.js";

const gameService: GameService = new GameService();
const gameController: GameController = new GameController(gameService);

gameController.init();
