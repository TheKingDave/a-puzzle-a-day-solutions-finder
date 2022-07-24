declare module "dlxlib" {
    /**
     * Creates an ES2015 Generator object that can be used to iterate over the solutions to the matrix.
     * This is a convenience function which avoids having to create an instance of the {@link Dlx} class.
     * It is useful if you are not interested in handling any events.
     * @param {Matrix} matrix The matrix to be solved.
     * @param {object} [options] Optional options object.
     * @param {number} options.numPrimaryColumns The number of primary columns. By default, all columns are primary.
     *     Any remaining columns are considered to be secondary columns.
     * @yields {Solution} The next solution.
     */
    export function* solutionGenerator(matrix: Matrix, options?: {numPrimaryColumns: number}): Generator<Solution> {
        yield* new Dlx().solutionGenerator(matrix, options)
    }

    /**
     * A matrix is an array of.
     */
    export type Matrix = any[][];

    export type Solution = number[];
}
