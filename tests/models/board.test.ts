import { describe, it, expect, beforeEach } from 'vitest';
import { Board } from '@models/models.js';
import { WIN_BITS } from '@constants/constants.js';

describe('Board', () => {
    
    let board: Board;

    beforeEach(() => {
        board = new Board();
    });

    it('should start with 0 bits', () => {
        expect(board.getBits()).toBe(0);
    });

    it('should add bits correctly', () => {
        board.addBits(1);
        board.addBits(2);
        expect(board.getBits()).toBe(3);
    });

    it('should reset bits to 0', () => {
        board.addBits(128);
        board.resetBits();
        expect(board.getBits()).toBe(0);
    });
});
