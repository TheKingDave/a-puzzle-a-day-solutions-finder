import {Solution, solutionGenerator} from "dlxlib";

const matrix = [
    [1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0],
];

const solutions: Solution[] = [];
for (const solution of solutionGenerator(matrix)) {
    console.log('new solution: ', solution);
    solutions.push(solution);
}

console.log('Found solutions:', solutions.length)