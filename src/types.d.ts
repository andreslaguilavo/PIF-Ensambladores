declare module '@helander/quine-mccluskey-js' {
  // Define the Minterm class
  class Minterm {
    constructor(values: number[], bits: string)
    values: number[]
    bits: string
  }

  // Define the QuineMcCluskey class
  class QuineMcCluskey {
    variables: string[]
    values: number[]
    allValues: number[]
    dontCares: number[]
    isMaxterm: boolean
    func: string | null

    /**
     * Creates a new QuineMcCluskey object to process the Quine-Mccluskey Algorithm
     * @param variables Array of variable names
     * @param values Array of values (decimal) to process
     * @param dontCares Optional array of don't care values
     * @param isMaxterm Boolean flag indicating if the function should handle maxterms
     */
    constructor(
      variables: string,
      values: number[],
      dontCares?: number[],
      isMaxterm?: boolean
    )

    /**
     * Returns the binary value equivalent to the decimal value given
     * @param value Decimal value
     * @returns Binary string representation of the value
     */
    getBits(value: number): string

    /**
     * Creates the initial grouping for the bits from the values
     * @returns A 2D array of Minterm objects, grouped by the number of 1s in their binary representation
     */
    initialGroup(): Minterm[][]

    /**
     * Creates a power set of all valid prime implicants that covers the rest of an expression.
     * @param values Values that need to be covered
     * @param primeImplicants Array of prime implicants to generate the power set from
     * @returns The minimum set of prime implicants that covers the expression
     */
    powerSet(values: number[], primeImplicants: Minterm[]): Minterm[]

    /**
     * Returns an array of all the prime implicants for an expression
     * @param groups Optional groups to process. If not provided, it will use the initial group.
     * @returns Array of prime implicants
     */
    getPrimeImplicants(groups?: Minterm[][] | null): Minterm[]

    /**
     * Solves for the expression returning the minimal amount of prime implicants needed
     * @returns Array of Minterm objects that form the minimal expression
     */
    solve(): Minterm[]

    /**
     * Returns the expression in a readable form
     * @returns The boolean expression as a string
     */
    getFunction(): string
  }

  export default QuineMcCluskey
}
