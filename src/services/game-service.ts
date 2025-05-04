import { Player, Board, Result } from "@models/models.js";
import { playerSymbols, EMPTY_STRING , RESULT_MESSAGE_DRAW, RESULT_MESSAGE_WIN, playerMoves } from "@constants/constants.js";
import { Bit, PlayerSymbol } from "@aliases/types.js";

export class GameService {

    private playerX: Player;
    private playerO: Player;
    private startingPlayer: Player;
    private currentPlayer: Player;
    private board: Board;

    constructor() {
        this.playerX = new Player(playerSymbols.X, playerMoves.FIRST);
        this.playerO = new Player(playerSymbols.O, playerMoves.SECOND);
        this.startingPlayer = this.playerX;
        this.currentPlayer = this.startingPlayer;
        this.board = new Board();
    }

    applyPlayersMove(bits: Bit): PlayerSymbol {
        const currentPlayerSymbol = this.currentPlayer.getSymbol();

        if (this.isCellOccupied(bits)) {
            
            return currentPlayerSymbol;
        }
        
        this.board.addBits(bits);
        this.currentPlayer.addBits(bits);
        this.currentPlayer.decrementAvailableMoves();
        
        return currentPlayerSymbol;
    }

    hasGameFinished(): Result {
        if (this.isGameWon()) {
            this.currentPlayer.incrementWins();
            const resultMessage = `${this.currentPlayer.getSymbol()} ${RESULT_MESSAGE_WIN}`;

            return new Result(resultMessage, true);
        }

        if (this.isGameDrawn()) {
            
            return new Result(RESULT_MESSAGE_DRAW, true);
        }

        return new Result(EMPTY_STRING, false);
    }

    getCurrentResult(): string {
        return `${this.playerX.getWins()}:${this.playerO.getWins()}`;
    }

    getCurrentPlayerSymbol(): PlayerSymbol {
        return this.currentPlayer.getSymbol();
    }

    startNewGame(): void {
        this.board.resetBits();
        this.playerX.resetBits();
        this.playerO.resetBits();
        this.switchStartingPlayer();
        this.currentPlayer = this.startingPlayer;
    }

    resetGame(): void {
        this.board.resetBits();
        this.playerX.resetBits();
        this.playerO.resetBits();
        this.playerX.resetWins();
        this.playerO.resetWins();
        this.playerX.setAvailableMoves(playerMoves.FIRST);
        this.playerO.setAvailableMoves(playerMoves.SECOND);
        this.startingPlayer = this.playerX;
        this.currentPlayer = this.startingPlayer;
    }

    switchCurrentPlayer(): void {
        this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
    }

    private switchStartingPlayer(): void {
        this.startingPlayer = this.startingPlayer === this.playerX ? this.playerO : this.playerX;
        this.startingPlayer === this.playerO ? this.playerO.setAvailableMoves(playerMoves.FIRST) : this.playerO.setAvailableMoves(playerMoves.SECOND);
        this.startingPlayer === this.playerX ? this.playerX.setAvailableMoves(playerMoves.FIRST) : this.playerX.setAvailableMoves(playerMoves.SECOND);
    }

    private isCellOccupied(bits: Bit): boolean {
        const occupiedBits = this.board.getBits();

        return (occupiedBits & bits) !== 0;
    }

    private isGameWon(): boolean {
        const currentPlayerSum = this.currentPlayer.getBits();

        return this.board.areWinningBits(currentPlayerSum);
    }

    private isGameDrawn(): boolean {
        const playerXBits = this.playerX.getBits();
        const playerXAvailableMoves = this.playerX.getAvailableMoves();
        
        const playerOBits = this.playerO.getBits();
        const playerOAvailableMoves = this.playerO.getAvailableMoves();

        return this.board.areDrawnBits(playerXBits, playerXAvailableMoves, playerOBits, playerOAvailableMoves);
    }
}
