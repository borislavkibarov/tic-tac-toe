import { PlayerSymbol } from "@aliases/types";

export const playerSymbols = {
    X: "X",
    O: "O",
} as const;

export const playerColours: Record<PlayerSymbol, string> = {
    X: "player-x-color",
    O: "player-o-color",
};

export const playerMoves = {
    FIRST: 5,
    SECOND: 4,
} as const;