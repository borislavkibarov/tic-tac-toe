import { DRAW_BITS, WIN_BITS } from "@constants/constants.js";
import { Bit, Bitmask, Move } from "@aliases/types.js";

export class Board {

    private bits: Bitmask;

    constructor() {
        this.bits = 0;
    }

    getBits(): Bitmask {
        return this.bits;
    }

    addBits(bits: Bit): void {
        this.bits += bits;
    }

    resetBits(): void {
        this.bits = 0;
    }

    areWinningBits(bits: Bitmask): boolean {
        for (let winBits of WIN_BITS) {
            if ((bits & winBits) === winBits) {

                return true;
            }
        }

        return false;
    }

    areDrawnBits(xBits: Bitmask, xAvailableMoves: Move, oBits: Bitmask, oAvailableMoves: Move): boolean {
        if (this.bits == DRAW_BITS) {
            return true;
        }

        const xCanWin = this.canStillWin(xBits, xAvailableMoves);
        const oCanWin = this.canStillWin(oBits, oAvailableMoves);

        return !xCanWin && !oCanWin;
    }

    private canStillWin(bits: Bitmask, availableMoves: Move): boolean {
        const availableBits = ~this.bits & DRAW_BITS;

        return WIN_BITS.some(winBits => {
            const requiredBits = winBits & ~bits;
            const requiredMoves = this.countRequiredMoves(requiredBits);

            const canWin = (requiredBits & availableBits) === requiredBits;
            const hasEnoughMoves = requiredMoves <= availableMoves;
    
            return canWin && hasEnoughMoves;
        });
    }

    private countRequiredMoves(bits: Bitmask): Move {
        let requiredMoves = 0;

        while (bits) {
            requiredMoves += bits & 1;
            bits >>= 1;
        }
        
        return requiredMoves;
    }
}
