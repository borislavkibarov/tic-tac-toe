import { playerSymbols, playerColours, ATTRIBUTE, CLASS, STYLE, TAG, TURN, EMPTY_STRING } from "@constants/constants.js";
import { Bit, PlayerSymbol } from "@aliases/types.js";

export class UIController {
  
  updateCell(bit: Bit, symbol: PlayerSymbol): void {
    const cell = document.querySelector(`[${ATTRIBUTE.BITS}="${bit}"]`) as HTMLElement;

    if (cell && !cell.innerHTML) {
      cell.textContent = symbol;
      cell.classList.remove(playerColours.X, playerColours.O);
      cell.classList.add(playerColours[symbol]);
    }
  }

  resetBoard(): void {
    document.querySelectorAll(`.${CLASS.SQUARE}`).forEach((cell) => {
      cell.textContent = EMPTY_STRING;
      cell.classList.remove(playerColours.X, playerColours.O);
    });
  }

  updateActivePlayer(symbol: PlayerSymbol): void {
    const dot = document.querySelector(`.${CLASS.DOT}`) as HTMLElement;

    if (dot) {
      dot.classList.remove(TURN.X, TURN.O);
      dot.classList.add(symbol === playerSymbols.X ? TURN.X : TURN.O);
    }
  }

  displayScore(score: string): void {
    const scoreMessage = document.querySelector(`.${CLASS.SCORE_MESSAGE}`) as HTMLElement;
    
    if (scoreMessage) {
      scoreMessage.textContent = score;
    }
  }

  showResult(message: string): void {
    const alert = document.querySelector(`.${CLASS.ALERT}`) as HTMLElement;
    const backdrop = document.querySelector(`.${CLASS.BACKDROP}`) as HTMLElement;

    if (alert && backdrop) {
      const messageDiv = document.createElement(TAG.DIV);

      messageDiv.className = CLASS.ALERT_MESSAGE;
      messageDiv.textContent = message;

      alert.innerHTML = EMPTY_STRING;
      alert.appendChild(messageDiv);

      alert.style.display = STYLE.DISPLAY_BLOCK;
      backdrop.style.display = STYLE.DISPLAY_BLOCK;

      setTimeout(() => {
        alert.style.display = STYLE.DISPLAY_NONE;
        backdrop.style.display = STYLE.DISPLAY_NONE;
        alert.innerHTML = EMPTY_STRING
        backdrop.innerHTML = EMPTY_STRING
      }, 3000);
    }
  }

  showGame(): void {
    (document.querySelector(`.${CLASS.GAME}`) as HTMLElement).style.display = STYLE.DISPLAY_BLOCK;
    (document.querySelector(`.${CLASS.MODE}`) as HTMLElement).style.display = STYLE.DISPLAY_NONE;
  }

  showModeSelector(): void {
    (document.querySelector(`.${CLASS.GAME}`) as HTMLElement).style.display = STYLE.DISPLAY_NONE;
    (document.querySelector(`.${CLASS.MODE}`) as HTMLElement).style.display = STYLE.DISPLAY_BLOCK;
  }

  showAIIndicator(): void {
    const aiIndicator = document.querySelector(`.${CLASS.AI_INDICATOR}`) as HTMLElement;

    if (aiIndicator) {
      aiIndicator.style.display = STYLE.DISPLAY_FLEX;
    }
  }

  hideAIIndicator(): void {
    const aiIndicator = document.querySelector(`.${CLASS.AI_INDICATOR}`) as HTMLElement;

    if (aiIndicator) {
      aiIndicator.style.display = STYLE.DISPLAY_NONE;
    }
  }
}
