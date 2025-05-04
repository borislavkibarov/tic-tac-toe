import { Bit, Bitmask, Move, PlayerSymbol, Win } from "@aliases/types.js";

export class Player {
    
    private bits: Bitmask;
    private symbol: PlayerSymbol;
    private wins: Win;
    private availableMoves: Move;

    constructor(symbol: PlayerSymbol, availableMoves: number) {
        this.bits = 0;
        this.symbol = symbol;
        this.wins = 0;
        this.availableMoves = availableMoves;
    }

    getBits(): Bitmask {
        return this.bits;
    }

    getSymbol(): PlayerSymbol {
        return this.symbol;
    }

    getWins(): Win {
        return this.wins;
    }

    getAvailableMoves(): Move {
        return this.availableMoves;
    }

    addBits(value: Bit): void {
        this.bits += value;
    }

    resetBits(): void {
        this.bits = 0;
    }

    incrementWins(): void {
        this.wins++;
    }

    resetWins(): void {
        this.wins = 0;
    }

    decrementAvailableMoves(): void {
        this.availableMoves--;
    }

    setAvailableMoves(availableMoves: Move): void {
        this.availableMoves = availableMoves;
    }
}
