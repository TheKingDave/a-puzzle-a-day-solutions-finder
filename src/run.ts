import {mirrorPiece, rotatePiece} from "./stringManipulation";
import {pieces} from "./pices";
import {boardSize, pieceFitsOnBoard, piecePositionToRow, printBoard} from "./board";
import {PiecePositions, PieceVariations, Row} from "./types";
import {dayRows, indexToMonthDay, months} from "./calendar";
import {Solution, solutionGenerator} from "dlxlib";
import {arrayWithOneAt} from "./util";
import fs from 'fs';
import path from "path";

const outputDir = './solutions';

const pieceVariations: PieceVariations[] = pieces.map(({label, piece, index}) => {
    let P: string[] = piece;

    const unique = new Set<string>();

    for (let i = 0; i < 4; i++) {
        unique.add(P.join('|'));
        P = rotatePiece(P);
    }

    P = mirrorPiece(P);

    for (let i = 0; i < 4; i++) {
        unique.add(P.join('|'));
        P = rotatePiece(P);
    }

    return {label, index, pieces: [...unique].map(str => str.split('|'))};
});

const piecePositions: PiecePositions[] = pieceVariations.map(({label, pieces, index}) => {
    const positions = [];

    for (const piece of pieces) {
        for (let x = 0; x < 6; x++) {
            for (let y = 0; y < 6; y++) {
                if (pieceFitsOnBoard(piece, x, y)) {
                    positions.push({piece, x, y});
                }
            }
        }
    }

    return {label, index, positions};
})

const pieceNums = pieces.length;
const idColumns = pieceNums + 1;
const rows: Row[] = []

for (const piecePosition of piecePositions) {
    for (const position of piecePosition.positions) {
        const cleanRow = piecePositionToRow(position.piece, position.x, position.y);
        cleanRow.unshift(...arrayWithOneAt(piecePosition.index, idColumns));
        rows.push(cleanRow);
    }
}

const dayRowsStart = rows.length; // 961
rows.push(...dayRows.map((r) => {
    r.unshift(...arrayWithOneAt(idColumns-1, idColumns));
    return r;
}));


const daySolutionMap = new Map<number, string[]>();

const addSolution = (day: number, solution: string) => {
    if (!daySolutionMap.has(day)) {
        daySolutionMap.set(day, [solution]);
        return;
    }
    daySolutionMap.get(day)!.push(solution);
}

console.log('Searching for solutions.')
let solutionCount = 0;
for (const solution of solutionGenerator(rows)) {
    solution.sort((a, b) => a - b);
    const dayIndex = solution.at(-1)! - dayRowsStart;

    const outChars: string[] = new Array(boardSize).fill(' ');

    const solutionRows = solution.map((num) => rows[num]);
    for (const row of solutionRows) {
        const col = row.indexOf(1);
        if (col >= pieceNums) {
            continue;
        }
        const label = pieces[col].label;
        for (let i = 0; i < boardSize; i++) {
            if (row[i + idColumns] === 1) {
                outChars[i] = label;
            }
        }
    }

    addSolution(dayIndex, outChars.join(''));
    solutionCount++;
    process.stdout.write(`\r${solutionCount}`);
}
console.log(`\rFound ${solutionCount} solutions`);

console.log('Start writing files');
fs.rmSync(outputDir, { recursive: true, force: true});
fs.mkdirSync(outputDir);

for (const [dayIndex, solutions] of daySolutionMap) {
    const [month, day] = indexToMonthDay(dayIndex);
    const out = JSON.stringify({
        month: months[month - 1],
        day,
        count: solutions.length,
        solutions,
    });
    fs.writeFileSync(path.join(outputDir, `${month}-${day}.json`), out);
}

console.log('Wrote all files');