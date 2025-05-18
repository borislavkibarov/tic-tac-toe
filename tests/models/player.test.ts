import { describe, it, expect, beforeEach } from 'vitest';
import { Player } from '@models/models.js';
import { playerSymbols, playerMoves } from '@constants/constants.js';

describe('Player', () => {
    
    let player: Player;

    beforeEach(() => {
        player = new Player(playerSymbols.X, playerMoves.FIRST);
    });

    it('should initialize with correct values', () => {
        expect(player.getSymbol()).toBe(playerSymbols.X);
        expect(player.getWins()).toBe(0);
        expect(player.getAvailableMoves()).toBe(playerMoves.FIRST);
        expect(player.getBits()).toBe(0);
    });

    it('should correctly add bits', () => {
        player.addBits(1);
        player.addBits(2);
        expect(player.getBits()).toBe(3);
    });

    it('should reset bits to 0', () => {
        player.addBits(16);
        player.resetBits();
        expect(player.getBits()).toBe(0);
    });

    it('should increment wins', () => {
        player.incrementWins();
        expect(player.getWins()).toBe(1);
    });

    it('should reset wins', () => {
        player.incrementWins();
        player.resetWins();
        expect(player.getWins()).toBe(0);
    });

    it('should decrement available moves', () => {
        const initial = player.getAvailableMoves();
        player.decrementAvailableMoves();
        expect(player.getAvailableMoves()).toBe(initial - 1);
    });

    it('should set available moves directly', () => {
        player.setAvailableMoves(99);
        expect(player.getAvailableMoves()).toBe(99);
    });
});
