import { GameMode } from "@constants/game-constants.js";
import { ATTRIBUTE, BUTTON, CLASS, EVENT } from "@constants/html-constants.js";
import { GameOrchestrator } from "./game-orchestrator.js";
import { ZERO_AS_STRING } from "@constants/common-constants.js";

export class InputController {
    
  constructor(private orchestrator: GameOrchestrator) {}

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
