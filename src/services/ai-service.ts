import { WIN_BITS, DRAW_BITS, ALL_BITS } from "@constants/constants.js";
import { Bit, Bitmask, PlayerSymbol } from "@aliases/types.js";

export class AIService {

    getBestMove(xBits: Bitmask, oBits: Bitmask): Bit {
        let bestScore = -Infinity;
        let bestMove: Bit = 0;

        const availableMoves = this.getAvailableMoves(xBits, oBits);

        for (const move of availableMoves) {
            const newOBits = oBits + move;

            const score = this.minimax(xBits, newOBits, false);

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    private minimax(xBits: Bitmask, oBits: Bitmask, isMaximizing: boolean): number {
        if (this.isWinner(oBits)) {
            return 1;
        }

        if (this.isWinner(xBits)) {
            return -1;
        }

        if (this.isDraw(xBits, oBits)) {
            return 0;
        }

        const availableMoves = this.getAvailableMoves(xBits, oBits);
        let bestScore = isMaximizing ? -Infinity : Infinity;

        for (const move of availableMoves) {
            if (isMaximizing) {
                const score = this.minimax(xBits, oBits + move, false);
                bestScore = Math.max(score, bestScore);
            } else {
                const score = this.minimax(xBits + move, oBits, true);
                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }

    private getAvailableMoves(xBits: Bitmask, oBits: Bitmask): Bit[] {
        const occupied = xBits + oBits;
        
        return ALL_BITS.filter(bit => (occupied & bit) === 0);
    }

    private isWinner(bits: Bitmask): boolean {
        return WIN_BITS.some(win => (bits & win) === win);
    }

    private isDraw(xBits: Bitmask, oBits: Bitmask): boolean {
        return (xBits + oBits) === DRAW_BITS;
    }
}
