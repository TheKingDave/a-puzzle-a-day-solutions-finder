import {Piece} from "./types";

export function printPiece(pattern: Piece): void {
    for(const line of pattern) {
        console.log(line);
    }
    console.log();
}