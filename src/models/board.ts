import { Bit, Bitmask } from "@aliases/types.js";

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
}
