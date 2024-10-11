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

export const generateKarnaughMap = (
  variables: string[],
  values: CellsKarMap[]
) => {
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
  const countVariables = variables.length
  // Calcular el número de filas y columnas de la tabla, basado en el número de variables
  // const countExpCols = Math.ceil(countVariables / 2);
  // const countExpRows = Math.floor(countVariables / 2);
  // const numRows = Math.pow(2, countExpRows);
  // const numCols = Math.pow(2, countExpCols);

  const structureTable = [...referenceTablePositions[countVariables]]
  for (const row of structureTable) {
    for (const [indexCell, cell] of row.entries()) {
      row[indexCell] = Number(
        values.find((_, index) => {
          return index === cell
        })
      )
    }
  }

  return structureTable
}

export const getHeadersKarMap = (variables: string[]) => {
  const midIndex = Math.floor(variables.length / 2)

  // Dividir el array en dos mitades
  const firstHalf = variables.slice(0, midIndex) // Desde el inicio hasta el medio
  const secondHalf = variables.slice(midIndex) // Desde el medio hasta el final

  return [firstHalf, secondHalf]
}
