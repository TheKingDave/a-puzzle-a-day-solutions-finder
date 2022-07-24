import {Piece} from "./types";

export const U = [
    '##',
    ' #',
    '##',
];

export const L = [
    '####',
    '#   ',
];

export const N = [
    '### ',
    '  ##',
];

export const S = [
    '###',
    '###',
];

export const P = [
    '###',
    '## ',
];

export const Y = [
    '####',
    ' #  ',
];

export const V = [
    '###',
    '#  ',
    '#  ',
];

export const Z = [
    '#  ',
    '###',
    '  #',
];

export const pieces: {label: string, index: number, piece: Piece}[] = Object.entries({U, L, N, S, P, Y, V, Z}).map(([label, piece], index) => ({label, piece, index}));