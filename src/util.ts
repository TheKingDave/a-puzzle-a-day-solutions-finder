export function printRow(row: number[]): void {
    console.log(row.join(''));
}

export function arrayWithOneAt(pos: number, length: number) {
    const arr = new Array(length);
    arr.fill(0);
    arr[pos] = 1;
    return arr;
}