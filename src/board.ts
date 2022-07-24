import {Piece} from "./types";

export const board = [6, 6, 7, 7, 7, 7, 3];
export const lengths = board.map((value, index) => board.slice(0, index).reduce((a, b) => a + b, 0));
export const boardSize = board.reduce((a, b) => a + b, 0);
export const width = board.reduce((a, b) => Math.max(a, b), 0);

export function pieceFitsOnBoard(pattern: string[], x: number, y: number): boolean {
    if (y + pattern.length > board.length || x + pattern[0].length > width) {
        return false;
    }

    for (const [index, line] of pattern.entries()) {
        const highestMarker = line.lastIndexOf('#');
        if (x + highestMarker >= board[y + index]) {
            return false;
        }
    }

    return true;
}

function posToRowIndex(x: number, y: number): number {
    return lengths[y] + x;
}

export function piecePositionToRow(piece: Piece, x: number, y: number): number[] {
    const row = new Array(boardSize).fill(0);

    for (const [ly, line] of piece.entries()) {
        for (let lx = 0; lx < line.length; lx++) {
            if (line[lx] === '#') {
                row[posToRowIndex(lx + x, ly + y)] = 1;
            }
        }
    }

    return row;
}

export function printBoard(row: number[]): void {
    for (const i in board) {
        const length = board[i];
        const prevLength = lengths[i];
        console.log(row.slice(prevLength, prevLength + length).join(''));
    }
    console.log();
}