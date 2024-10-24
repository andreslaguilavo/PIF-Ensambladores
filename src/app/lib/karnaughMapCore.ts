import QuineMcCluskey from '@helander/quine-mccluskey-js'

type CellsKarMap = number | boolean
interface HeadersKarMap {
  cols: string[]
  rows: string[]
}
/**
 * Estructura de referencia para las cabeceras en el mapa de Karnaugh.
 */
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

/**
 * Estructura de referencia para las posiciones en el mapa de Karnaugh.
 */
const referenceTablePositions: Record<number, CellsKarMap[][]> = {
  2: [
    [0, 1],
    [2, 3]
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

/**
 * Genera un mapa de Karnaugh a partir de las variables y valores proporcionados.
 *
 * @param {string[]} variables - Un array de cadenas que representan las variables.
 * @param {CellsKarMap[]} values - Un array de valores que representan las celdas del mapa de Karnaugh.
 * @returns {CellsKarMap[][]} - Una matriz bidimensional que representa el mapa de Karnaugh.
 */
export const generateKarnaughMap = (
  variables: string[],
  values: CellsKarMap[]
) => {
  const countVariables = variables.length

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

/**
 * Obtiene los encabezados para el mapa de Karnaugh a partir de las variables proporcionadas.
 *
 * @param {string[]} variables - Un array de cadenas que representan las variables.
 * @returns {string[][]} - Un array de dos subarrays, cada uno representando una mitad de las variables.
 */
export const getHeadersKarMap = (variables: string[]) => {
  const midIndex = Math.floor(variables.length / 2)

  // Dividir el array en dos mitades
  const firstHalf = variables.slice(0, midIndex) // Desde el inicio hasta el medio
  const secondHalf = variables.slice(midIndex) // Desde el medio hasta el final

  return [firstHalf, secondHalf]
}

/**
 * Reduce una expresión booleana utilizando el algoritmo de Quine-McCluskey y los maxterminos.
 *
 * @param {string[]} variables - Un array de nombres de variables utilizadas en la expresión booleana.
 * @param {CellsKarMap[][]} values - Una matriz de índices donde el valor es 1.
 * @returns {string} - Una cadena que representa la expresión booleana minimizada.
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

/**
 * Obtiene los índices de las celdas que contienen un valor específico (0 o 1) en una matriz de valores.
 *
 * @param {CellsKarMap[][]} values - Una matriz de valores que representan las celdas del mapa de Karnaugh.
 * @param {0 | 1} [searched=1] - El valor que se está buscando en las celdas (0 o 1).
 * @returns {number[]} - Un array de índices de las celdas que contienen el valor buscado.
 */
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

/**
 * Encuentra grupos de 1s en un mapa de Karnaugh.
 *
 * @param {number[][]} kMap - Una matriz bidimensional que representa el mapa de Karnaugh.
 * @returns {number[][][]} - Un array de grupos, donde cada grupo es un array de coordenadas [fila, columna].
 */
export function findGroups(kMap: CellsKarMap[][]): number[][][] {
  const groups: number[][][] = []
  const visited = new Set<string>()

  const rows = kMap.length
  const cols = kMap[0].length

  const getLinearIndex = (row: number, col: number): string => `${row},${col}`

  const canFormRectangle = (
    startRow: number,
    startCol: number,
    height: number,
    width: number
  ): boolean => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const row = startRow + i
        const col = startCol + j
        if (
          row >= rows ||
          col >= cols ||
          kMap[row][col] !== 1 ||
          visited.has(getLinearIndex(row, col))
        ) {
          return false
        }
      }
    }
    return true
  }

  const markVisited = (
    startRow: number,
    startCol: number,
    height: number,
    width: number
  ) => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const row = startRow + i
        const col = startCol + j
        visited.add(getLinearIndex(row, col))
      }
    }
  }

  // Tamaños de grupo posibles en orden descendente
  const groupSizes = [16, 8, 4, 2, 1]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (kMap[i][j] === 1 && !visited.has(getLinearIndex(i, j))) {
        for (const size of groupSizes) {
          const height = Math.min(size, rows - i)
          const width = Math.min(size / height, cols - j)
          if (canFormRectangle(i, j, height, width)) {
            const group: number[][] = []
            for (let x = 0; x < height; x++) {
              for (let y = 0; y < width; y++) {
                group.push([i + x, j + y])
              }
            }
            groups.push(group)
            markVisited(i, j, height, width)
            break
          }
        }
      }
    }
  }

  return groups
}
