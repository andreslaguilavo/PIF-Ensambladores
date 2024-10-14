import QuineMcCluskey from '@helander/quine-mccluskey-js'

type CellsKarMap = number | boolean
interface HeadersKarMap {
  cols: string[]
  rows: string[]
}
export const referenceTableHeaders: Record<number, HeadersKarMap> = {
  2: {
    cols: ['0', '1'],
    rows: ['0', '1']
  },
  3: {
    cols: ['00', '01', '11', '10'],
    rows: ['0', '1']
  },
  4: {
    cols: ['00', '01', '11', '10'],
    rows: ['00', '01', '11', '10']
  }
}

const referenceTablePositions: Record<number, CellsKarMap[][]> = {
  2: [
    [0, 1],
    [3, 2]
  ],
  3: [
    [0, 1, 3, 2],
    [4, 5, 7, 6]
  ],
  4: [
    [0, 1, 3, 2],
    [4, 5, 7, 6],
    [12, 13, 15, 14],
    [8, 9, 11, 10]
  ]
}

export const generateKarnaughMap = (
  variables: string[],
  values: CellsKarMap[]
) => {
  const countVariables = variables.length
  // Calcular el número de filas y columnas de la tabla, basado en el número de variables
  // const countExpCols = Math.ceil(countVariables / 2);
  // const countExpRows = Math.floor(countVariables / 2);
  // const numRows = Math.pow(2, countExpRows);
  // const numCols = Math.pow(2, countExpCols);

  const deepCopyOfStructureTable = JSON.parse(
    JSON.stringify(referenceTablePositions[countVariables])
  ) as CellsKarMap[][]
  for (const row of deepCopyOfStructureTable) {
    for (const [indexCell, cell] of row.entries()) {
      row[indexCell] = Number(
        values.find((_, index) => {
          return index === cell
        })
      )
    }
  }

  return deepCopyOfStructureTable
}

export const getHeadersKarMap = (variables: string[]) => {
  const midIndex = Math.floor(variables.length / 2)

  // Dividir el array en dos mitades
  const firstHalf = variables.slice(0, midIndex) // Desde el inicio hasta el medio
  const secondHalf = variables.slice(midIndex) // Desde el medio hasta el final

  return [firstHalf, secondHalf]
}

/**
 * Reduces a boolean expression using the Quine-McCluskey algorithm and the Maxterms.
 *
 * @param variables - An array of variable names used in the boolean expression.
 * @param values - An array of indexes where a value is 1.
 * @returns A string representing the minimized boolean expression.
 */
export const getReduceExpression = (
  variables: string[],
  values: CellsKarMap[][]
) => {
  const countVariables = variables.length
  const indexesWithZero: number[] = []

  for (let index = 0; index < values.length; index++) {
    const row = values[index]
    for (let j = 0; j < row.length; j++) {
      const value = row[j]
      if (value !== 1) {
        indexesWithZero.push(
          Number(referenceTablePositions[countVariables][index][j])
        )
      }
    }
  }
  const f = new QuineMcCluskey(variables.join(''), indexesWithZero, [], true)

  const expression = f.getFunction()
  console.log(expression)
  const reducedExpression = expression
    .replace(/\bNOT\s+/g, '!')
    .replace(/\bAND\b/g, '')
    .replace(/\bOR\b/g, '+')

  return reducedExpression
}
