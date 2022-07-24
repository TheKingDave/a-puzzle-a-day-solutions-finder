export type Piece = string[];
export type Row = number[];

export interface PieceVariations {
    label: string;
    index: number;
    pieces: Piece[];
}

export interface PiecePositions {
    label: string;
    index: number;
    positions: {x: number, y: number, piece: Piece}[],
}
