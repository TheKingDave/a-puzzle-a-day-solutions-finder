export function arrayWithOneAt(pos: number, length: number) {
    const arr = new Array(length).fill(0);
    arr[pos] = 1;
    return arr;
}