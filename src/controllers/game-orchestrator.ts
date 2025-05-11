import { GameService } from "@services/game-service.js";
import { UIController } from "./ui-controller.js";
import { GameMode } from "@constants/game-constants.js";
import { Bit } from "@aliases/types.js";
import { playerSymbols } from "@constants/constants.js";

export class GameOrchestrator {

  private inputLocked: boolean = false;
    
  constructor(private game: GameService,
              private ui: UIController) {}

  onModeSelect(mode: GameMode): void {
    this.game.resetGame();
    this.game.setGameMode(mode);
    this.ui.showGame();
    this.ui.displayScore(this.game.getCurrentResult());
    this.ui.updateActivePlayer(this.game.getCurrentPlayerSymbol());
  }

  onCellClick(bit: Bit): void {
    if (this.game.isCellOccupied(bit)) {
       return;
    }

    const playerSymbol = this.game.makeMove(bit);
    this.ui.updateCell(bit, playerSymbol);

    const result = this.game.hasGameFinished();

    if (result.getIsFinished()) {
      this.ui.showResult(result.getMessage());
      this.game.startNewGame();
      this.ui.resetBoard();
      this.ui.displayScore(this.game.getCurrentResult());

      if (this.hasToMakeAIMove()) {
        this.makeAIMove(3500);
      }

      this.ui.updateActivePlayer(this.game.getCurrentPlayerSymbol());

      return;
    }

    this.game.switchCurrentPlayer();
    this.ui.updateActivePlayer(this.game.getCurrentPlayerSymbol());

    if (this.hasToMakeAIMove()) {
      this.makeAIMove(500)
    }
  }

  onResetClick(): void {
    this.game.resetGame();
    this.ui.resetBoard();
    this.ui.displayScore(this.game.getCurrentResult());
    this.ui.updateActivePlayer(this.game.getCurrentPlayerSymbol());
  }

  onNewGameClick(): void {
    this.onResetClick();
    this.ui.showModeSelector();
  }

  isInputLocked(): boolean {
    return this.inputLocked;
  }

  private lockInput(): void {
    this.inputLocked = true;
  }

  private unlockInput(): void {
    this.inputLocked = false;
  }

  private hasToMakeAIMove(): boolean {
    return this.game.isAgainstAI() && this.game.getCurrentPlayerSymbol() === playerSymbols.O;
  }

  private makeAIMove(timeout: number): void {
    this.lockInput();

    setTimeout(() => {
      const aiMove = this.game.makeAIMove();
      this.unlockInput();
      this.onCellClick(aiMove);
    }, timeout);
  }
}
