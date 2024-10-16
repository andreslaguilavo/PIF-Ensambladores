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
  const indexesWithZero: number[] = getCellsWithZeroOrOne(values, 0)

  const f = new QuineMcCluskey(variables.join(''), indexesWithZero, [], true)

  const expression = f.getFunction()
  const reducedExpression = expression
    .replace(/\bNOT\s+/g, '!')
    .replace(/\bAND\b/g, '')
    .replace(/\bOR\b/g, '+')

  return reducedExpression
}

export const getCellsWithZeroOrOne = (
  values: CellsKarMap[][],
  searched: 0 | 1 = 1
) => {
  const cellsWithOne: number[] = []
  for (let index = 0; index < values.length; index++) {
    const row = values[index]
    for (let j = 0; j < row.length; j++) {
      const value = row[j]
      if (value === searched) {
        cellsWithOne.push(
          Number(referenceTablePositions[values.length][index][j])
        )
      }
    }
  }
  return cellsWithOne
}

const cellsToCheck: Record<number, number[]> = {
  0: [1, 4, 2, 8],
  1: [0, 3, 5, 9],
  2: [3, 0, 6, 10],
  3: [2, 1, 7, 11],
  4: [5, 0, 6, 12],
  5: [4, 1, 7, 13],
  6: [7, 2, 4, 14],
  7: [6, 3, 5, 15],
  8: [9, 10, 0, 12],
  9: [8, 11, 1, 13],
  10: [11, 8, 2, 14],
  11: [10, 9, 3, 15],
  12: [13, 8, 14, 4],
  13: [12, 9, 15, 5],
  14: [15, 10, 12, 6],
  15: [14, 11, 13, 7]
}

// export const getGroupsKarMap = (
//   variables: string[],
//   values: CellsKarMap[][]
// ) => {
//   const indexesWithOne = getCellsWithZeroOrOne(values, 1)
//   const groups = []
//   const possibleGroup = []
//   for (const element of indexesWithOne) {
//     const neighborCells = cellsToCheck[element]
//     for (const cell of neighborCells) {
//       if (indexesWithOne.includes(cell)) {
//         possibleGroup.push(cell)
//       }
//     }
//   }
//   console.log(possibleGroup)
// }

export const getGroupsKarMap = (
  variables: string[],
  values: CellsKarMap[][]
) => {
  const indexesWithOne = getCellsWithZeroOrOne(values, 1)
  const groups = []
  const visited = new Set()

  // Función para revisar si una celda puede agregarse a un grupo
  const canAddToGroup = (cell, group) => {
    return cellsToCheck[cell].every((neighbor) => !group.includes(neighbor))
  }

  // Función que intenta formar un grupo a partir de una celda
  const tryToFormGroup = (element, size) => {
    const newGroup = [element]
    const queue = [element]
    visited.add(element)

    while (queue.length > 0 && newGroup.length < size) {
      const current = queue.shift()
      const neighborCells = cellsToCheck[current]

      for (const cell of neighborCells) {
        if (
          indexesWithOne.includes(cell) &&
          !visited.has(cell) &&
          canAddToGroup(cell, newGroup)
        ) {
          newGroup.push(cell)
          visited.add(cell)
          queue.push(cell)

          // Si alcanzamos el tamaño deseado, terminamos
          if (newGroup.length === size) {
            break
          }
        }
      }
    }

    return newGroup.length === size ? newGroup : null
  }

  // Intentar formar grupos de tamaño 4 y luego 2
  for (const element of indexesWithOne) {
    if (visited.has(element)) continue

    // Buscar grupos de tamaño 4 primero
    const groupOfFour = tryToFormGroup(element, 4)
    if (groupOfFour) {
      groups.push(groupOfFour)
      continue
    }

    // Luego buscar grupos de tamaño 2
    const groupOfTwo = tryToFormGroup(element, 2)
    if (groupOfTwo) {
      groups.push(groupOfTwo)
      continue
    }

    // Finalmente grupos de tamaño 1 si no se encontró nada más grande
    groups.push([element])
    visited.add(element)
  }

  // console.log(groups)
  return groups
}
