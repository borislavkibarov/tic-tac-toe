import { playerSymbols, playerColours , EMPTY_STRING, ZERO_AS_STRING, TOAST_MESSAGE_TIMEOUT, CLASS, STYLE, ATTRIBUTE, BUTTON, TURN, EVENT, TAG } from '@constants/constants.js';
import { GameService } from "@services/services.js";
import { Bit } from '@aliases/types.js';

export class GameController {

    private game: GameService;

    constructor(game: GameService) {
        this.game = game;
    }

    init(): void {
        this.initializeCellClickHandler();
        this.initializeResetButtonHandler();
        this.displayScore();
    }

    initializeCellClickHandler(): void {
        document.querySelectorAll(`.${CLASS.SQUARE}`).forEach(cell => {
            cell.addEventListener(EVENT.CLICK, () => {
                this.handleCellClick(cell);
            });
        });
    }

    initializeResetButtonHandler(): void {
        document.querySelector(`.${BUTTON.RESET}`)?.addEventListener(EVENT.CLICK, () => this.handleResetButton());
    }

    private handleCellClick(cell: Element): void {
        const wasCellUpdated = this.updateCellValue(cell);

        if (wasCellUpdated) {
            this.checkIfGameIsFinished();
            this.displayPlayerAtTurn();
        }
    }

    private handleResetButton(): void {
        this.game.resetGame();
        this.clearCells();
        this.displayScore();
        this.displayPlayerAtTurn();
    }

    private clearCells(): void {
        document.querySelectorAll(`.${CLASS.SQUARE}`).forEach(cell => {
            cell.textContent = EMPTY_STRING;
        });
    }

    private updateCellValue(cell: Element): boolean {
        if(cell.innerHTML) {
            return false;
        }

        const bits: Bit = parseInt(cell.getAttribute(ATTRIBUTE.BITS) || ZERO_AS_STRING);
        const playerSymbol = this.game.applyPlayersMove(bits);

        if(cell) {
            cell.textContent = playerSymbol;
            const colour = playerSymbol === playerSymbols.X ? playerColours.X : playerColours.O;
            cell.classList.remove(playerColours.X, playerColours.O);
            cell.classList.add(colour);
        }

        return true;
    }

    private checkIfGameIsFinished(): void {
        const hasGameFinished = this.game.hasGameFinished();

        if (hasGameFinished.getIsFinished()) {
            this.displayGameResult(hasGameFinished.getMessage());
            this.game.startNewGame();
            this.clearCells();

            return;
        }

        this.game.switchCurrentPlayer();
    }

    private displayGameResult(message: string): void {
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
                alert.innerHTML = EMPTY_STRING;
                backdrop.innerHTML = EMPTY_STRING;
            }, TOAST_MESSAGE_TIMEOUT);

            this.displayScore();
        }
    }

    private displayScore(): void {
        const scoreMessage = document.querySelector(`.${CLASS.SCORE_MESSAGE}`) as HTMLElement;

        if (scoreMessage) {
            scoreMessage.textContent = this.game.getCurrentResult();
        }
    }

    private displayPlayerAtTurn(): void {
        const dot = document.querySelector(`.${CLASS.DOT}`) as HTMLElement;
        const currentPlayerSymbol = this.game.getCurrentPlayerSymbol();

        if (dot) {   
            dot.classList.remove(TURN.X, TURN.O);
            dot.classList.add(currentPlayerSymbol === playerSymbols.X ? TURN.X : TURN.O);
        }
    }
}
