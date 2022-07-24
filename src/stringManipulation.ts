import {Piece} from "./types";

export const rotatePiece = (pattern: Piece): Piece => {
    const h = pattern.length;
    const w = pattern[0].length;

    return [...Array(w)].map((_, x) => [...Array(h)].map((_, y) => pattern[y][w-x-1]).join(''));
}

export const mirrorPiece = (pattern: Piece): Piece => {
    return [...Array(pattern.length)].map((_, i) => pattern[pattern.length-i-1]);
}