import { playerSymbols } from "@constants/constants.js";

export type PlayerSymbol = typeof playerSymbols[keyof typeof playerSymbols];
export type Win = number;
export type Move = number;
