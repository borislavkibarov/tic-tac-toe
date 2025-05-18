import { describe, it, expect, beforeEach } from 'vitest';
import { AIService } from '@services/services.js';
import { DRAW_BITS } from '@constants/constants.js';

describe('AIService', () => {

    const ai: AIService = new AIService();

    it('should return a valid bit (unoccupied move)', () => {
        const xBits = 1 + 2 + 4;
        const oBits = 8 + 16 + 32;

        const move = ai.getBestMove(xBits, oBits);
        expect((xBits + oBits + move) <= DRAW_BITS).toBe(true);
        expect((xBits & move)).toBe(0);
        expect((oBits & move)).toBe(0);
    });

    it('should take the winning move if available', () => {
        // O has 1 + 2 = 3, and 4 is available → win top row
        const xBits = 8 + 16;
        const oBits = 1 + 2;

        const move = ai.getBestMove(xBits, oBits);
        expect(move).toBe(4); // completes 1 + 2 + 4 = 7
    });

    it('should block opponent’s winning move', () => {
        // X has 1 + 2, AI must block 4
        const xBits = 1 + 2;
        const oBits = 16;

        const move = ai.getBestMove(xBits, oBits);
        expect(move).toBe(4); // block X from winning top row
    });

    it('should not return a move if board is full', () => {
        const xBits = 255; // Any combo
        const oBits = 256;

        const move = ai.getBestMove(xBits, oBits);
        expect(move).toBe(0); // means no move possible
    });
});
