import { Player, Board, Result } from "@models/models.js";
import { playerSymbols, EMPTY_STRING , RESULT_MESSAGE_DRAW, RESULT_MESSAGE_WIN, playerMoves, GameMode } from "@constants/constants.js";
import { Bit, PlayerSymbol } from "@aliases/types.js";
import { AIService } from "@services/services.js";

export class GameService {

    private playerX: Player;
    private playerO: Player;
    private startingPlayer: Player;
    private currentPlayer: Player;
    private board: Board;
    private gameMode: GameMode;
    private ai: AIService;

    constructor(ai: AIService) {
        this.playerX = new Player(playerSymbols.X, playerMoves.FIRST);
        this.playerO = new Player(playerSymbols.O, playerMoves.SECOND);
        this.startingPlayer = this.playerX;
        this.currentPlayer = this.startingPlayer;
        this.board = new Board();
        this.gameMode = GameMode.PvP;
        this.ai = ai;
    }

    makeMove(bits: Bit): PlayerSymbol {
        if (this.isCellOccupied(bits)) {
            return this.currentPlayer.getSymbol();
        }

        this.board.addBits(bits);
        this.currentPlayer.addBits(bits);
        this.currentPlayer.decrementAvailableMoves();
        
        return this.currentPlayer.getSymbol();
    }

    makeAIMove(): Bit {
        return this.ai.getBestMove(this.playerX.getBits(), this.playerO.getBits());
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

    setGameMode(mode: GameMode): void {
        this.gameMode = mode;
    }

    isAgainstAI(): boolean {
        return this.gameMode === GameMode.PvE;
    }

    getCurrentPlayerSymbol(): PlayerSymbol {
        return this.currentPlayer.getSymbol();
    }

    switchCurrentPlayer(): void {
        this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
    }

    isCellOccupied(bits: Bit): boolean {
        return (this.board.getBits() & bits) !== 0;
    }

    getCurrentResult(): string {
        return `${this.playerX.getWins()}:${this.playerO.getWins()}`;
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

    private switchStartingPlayer(): void {
        this.startingPlayer = this.startingPlayer === this.playerX ? this.playerO : this.playerX;
        this.startingPlayer === this.playerO ? this.playerO.setAvailableMoves(playerMoves.FIRST) : this.playerO.setAvailableMoves(playerMoves.SECOND);
        this.startingPlayer === this.playerX ? this.playerX.setAvailableMoves(playerMoves.FIRST) : this.playerX.setAvailableMoves(playerMoves.SECOND);
    }

    private isGameWon(): boolean {
        const currentPlayerBits = this.currentPlayer.getBits();

        return this.board.areWinningBits(currentPlayerBits);
    }

    private isGameDrawn(): boolean {
        const playerXBits = this.playerX.getBits();
        const playerXAvailableMoves = this.playerX.getAvailableMoves();
        const playerOBits = this.playerO.getBits();
        const playerOAvailableMoves = this.playerO.getAvailableMoves();
        
        return this.board.areDrawnBits(playerXBits, playerXAvailableMoves, playerOBits, playerOAvailableMoves);
    }
}