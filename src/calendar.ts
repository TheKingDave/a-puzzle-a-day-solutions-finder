import {Row} from "./types";
import {boardSize} from "./board";
import { strict as assert } from 'node:assert';

export const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
assert(months.length === 12);
const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
assert(daysInMonths.length === 12);
const dayLengths = daysInMonths.map((value, index) => daysInMonths.slice(0, index+1).reduce((a, b) => a + b, 0));

export const dayRows: Row[] = [];

for (const [month, days] of daysInMonths.entries()) {
    for (let day = 0; day < days; day++) {
        const row = new Array(boardSize).fill(0);
        row[month] = 1;
        row[12 + day] = 1;
        dayRows.push(row);
    }
}

export function indexToMonthDay(index: number): [month: number, day: number] {
    const month = dayLengths.findIndex((l) => l > index);
    const day = (index - (dayLengths[month - 1] ?? 0));
    return [month + 1, day + 1];
}

export function indexToMonthDayHuman(index: number): string {
    const month = dayLengths.findIndex((l) => l > index);
    const day = (index - (dayLengths[month - 1] ?? 0)) + 1;
    return `${months[month]} ${day}`;
}