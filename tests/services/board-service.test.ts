import { BoardService } from '@services/services.js';
import { WIN_BITS } from '@constants/constants';

describe('BoardService', () => {
    
    const board = new BoardService();

    beforeEach(() => {
        board.resetBits();
    });

    it('should detect a winning combination', () => {
        for (const win of WIN_BITS) {
            board.resetBits();
            expect(board.areWinningBits(win)).toBe(true);
        }
    });

    it('should not detect a win if incomplete', () => {
        // Only part of a winning combo
        board.addBits(1); // top-left
        board.addBits(2); // top-middle
        expect(board.areWinningBits(board.getBits())).toBe(false);
    });

    it('should detect drawn board when no wins are possible', () => {
        // Full draw state: X=93, O=418 — no wins possible
        const xBits = 93; // 1+4+8+16+64
        const oBits = 418; // 2+32+128+256
        board.addBits(xBits);
        board.addBits(oBits);
        expect(board.areDrawnBits(xBits, 0, oBits, 0)).toBe(true);
    });

    it('should detect that player can still win when enough bits are available', () => {
        const xBits = 1 + 2; // Top-left and top-middle
        const oBits = 8 + 16;
        const xAvailableMoves = 2;
        const oAvailableMoves = 2;

        expect(board.areDrawnBits(xBits, xAvailableMoves, oBits, oAvailableMoves)).toBe(false); // X can still complete top row
    });
});