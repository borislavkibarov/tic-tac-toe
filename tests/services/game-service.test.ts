import { describe, it, expect, beforeEach } from 'vitest';
import { GameService } from '../../src/services/game-service';
import { BoardService } from '../../src/services/board-service';
import { AIService } from '../../src/services/ai-service';
import { GameMode } from '../../src/constants/game-constants';
import { ALL_BITS } from '@constants/constants';

describe('GameService', () => {

    let game: GameService;

    beforeEach(() => {
        const boardService = new BoardService();
        const aiService = new AIService();
        game = new GameService(aiService, boardService);
    });

    it('should initialize with X as starting player and 0:0 score', () => {
        expect(game.getCurrentPlayerSymbol()).toBe('X');
        expect(game.getCurrentResult()).toBe('0:0');
    });

    it('should make a valid move and update internal state', () => {
        const symbol = game.makeMove(1); // top-left
        expect(symbol).toBe('X');
        expect(game.isCellOccupied(1)).toBe(true);
    });

    it('should not override a move in an occupied cell', () => {
        game.makeMove(1);
        const symbol = game.makeMove(1); // try same cell
        expect(symbol).toBe('X'); // still X (doesn't switch)
    });

    it('should switch current player after valid move', () => {
        game.makeMove(1);
        game.switchCurrentPlayer();
        expect(game.getCurrentPlayerSymbol()).toBe('O');
    });

    it('should detect a win correctly', () => {
        // simulate top row win: 1 + 2 + 4
        game.makeMove(1); // X takes top-left
        game.switchCurrentPlayer();

        game.makeMove(8); // O takes middle-left
        game.switchCurrentPlayer();

        game.makeMove(2); // X takes top-middle
        game.switchCurrentPlayer();

        game.makeMove(16); // O takes middle-middle
        game.switchCurrentPlayer();

        game.makeMove(4); // X takes top-right

        const result = game.hasGameFinished();
        expect(result.getIsFinished()).toBe(true);
        expect(result.getMessage()).toContain('X wins');
    });

    it('should detect a draw correctly', () => {
        // Alternate X and O
        for (let i = 0; i < ALL_BITS.length; i++) {
            game.makeMove(ALL_BITS[i]);
            game.switchCurrentPlayer();
        }

        const result = game.hasGameFinished();
        expect(result.getIsFinished()).toBe(true);
        expect(result.getMessage()).toBe('Cats game!');
    });

    it('should reset the game board and players on reset', () => {
        game.makeMove(1);
        game.switchCurrentPlayer();
        game.makeMove(2);
        game.resetGame();

        expect(game.getCurrentResult()).toBe('0:0');
        expect(game.isCellOccupied(1)).toBe(false);
        expect(game.isCellOccupied(2)).toBe(false);
    });

    it('should update game mode and detect AI mode correctly', () => {
        game.setGameMode(GameMode.PvE);
        expect(game.isAgainstAI()).toBe(true);

        game.setGameMode(GameMode.PvP);
        expect(game.isAgainstAI()).toBe(false);
    });

    it('should return a valid AI move when called', () => {
        game.setGameMode(GameMode.PvE);
        const move = game.makeAIMove();
        expect(typeof move).toBe('number');
        expect(move).toBeGreaterThan(0);
    });
});
