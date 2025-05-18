import { Bitmask, Move } from "@aliases/types.js";
import { WIN_BITS, DRAW_BITS } from "@constants/constants";
import { Board } from "@models/models";

export class BoardService {

    private board: Board;

    constructor() {
        this.board = new Board();
    }

    addBits(bits: Bitmask): void {
        this.board.addBits(bits);
    }

    getBits(): Bitmask {
        return this.board.getBits();
    }

    resetBits(): void {
        this.board.resetBits();
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
        if (this.board.getBits() == DRAW_BITS) {
            return true;
        }

        const xCanWin = this.canStillWin(xBits, xAvailableMoves);
        const oCanWin = this.canStillWin(oBits, oAvailableMoves);

        return !xCanWin && !oCanWin;
    }

    private canStillWin(bits: Bitmask, availableMoves: Move): boolean {
        const availableBits = ~this.board.getBits() & DRAW_BITS;

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