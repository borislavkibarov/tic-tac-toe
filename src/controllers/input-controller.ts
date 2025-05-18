import { GameMode, ATTRIBUTE, BUTTON, CLASS, EVENT, ZERO_AS_STRING } from "@constants/constants.js";
import { GameController } from "@controllers/game-controller.js";

export class InputController {
    
  constructor(private orchestrator: GameController) {}

  init(): void {
    this.initModeButtons();
    this.initGameBoard();
    this.initResetButton();
    this.initNewGameButton();
  }

  private initModeButtons(): void {
    document.querySelectorAll(`.${BUTTON.MODE}`).forEach((btn) => {
      btn.addEventListener(EVENT.CLICK, (event) => {
        const mode = (event.target as HTMLElement).dataset.mode as GameMode;
        this.orchestrator.onModeSelect(mode);
      });
    });
  }

  private initGameBoard(): void {
    document.querySelectorAll(`.${CLASS.SQUARE}`).forEach((cell) => {
      cell.addEventListener(EVENT.CLICK, () => {
        if (this.orchestrator.isInputLocked()) {
          return;
        }
        
        const bit = parseInt(cell.getAttribute(ATTRIBUTE.BITS) || ZERO_AS_STRING);
        this.orchestrator.onCellClick(bit);
      });
    });
  }

  private initResetButton(): void {
    document.querySelector(`.${BUTTON.RESET}`)?.addEventListener(EVENT.CLICK, () => {
      this.orchestrator.onResetClick();
    });
  }

  private initNewGameButton(): void {
    document.querySelector(`.${BUTTON.NEW_GAME}`)?.addEventListener(EVENT.CLICK, () => {
      this.orchestrator.onNewGameClick();
    });
  }
}
