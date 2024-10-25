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
 * @param {CellsKarMap[][]} kMap - Una matriz bidimensional que representa el mapa de Karnaugh.
 * @returns {number[][][]} - Un array de grupos, donde cada grupo es un array de coordenadas [fila, columna].
 */
export function findGroups(kMap: CellsKarMap[][]): number[][][] {
  // Array para almacenar los grupos de 1s encontrados
  const groups: number[][][] = []
  // Conjunto para almacenar las celdas ya visitadas
  const visited = new Set<string>()

  // Número de filas en el mapa de Karnaugh
  const rows = kMap.length
  // Número de columnas en el mapa de Karnaugh
  const cols = kMap[0].length

  // Función para obtener un índice lineal a partir de una coordenada [fila, columna]
  const getLinearIndex = (row: number, col: number): string => `${row},${col}`

  // Función auxiliar para verificar si se puede formar un rectángulo de 1s a partir de una celda inicial
  const canFormRectangle = (
    startRow: number,
    startCol: number,
    height: number,
    width: number
  ): boolean => {
    // Itera sobre la altura del rectángulo
    for (let i = 0; i < height; i++) {
      // Itera sobre el ancho del rectángulo
      for (let j = 0; j < width; j++) {
        const row = startRow + i
        const col = startCol + j
        // Verifica si la celda actual está fuera de los límites, no contiene un 1 o ya ha sido visitada
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

  // Función auxiliar para marcar un grupo de celdas como visitadas
  const markVisited = (
    startRow: number,
    startCol: number,
    height: number,
    width: number
  ) => {
    // Itera sobre la altura del grupo
    for (let i = 0; i < height; i++) {
      // Itera sobre el ancho del grupo
      for (let j = 0; j < width; j++) {
        const row = startRow + i
        const col = startCol + j
        // Marca la celda actual como visitada
        visited.add(getLinearIndex(row, col))
      }
    }
  }

  // Tamaños de grupo posibles en orden descendente
  const groupSizes = [16, 8, 4, 2, 1]

  // Itera sobre cada celda del mapa de Karnaugh
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Si la celda contiene un 1 y no ha sido visitada
      if (kMap[i][j] === 1 && !visited.has(getLinearIndex(i, j))) {
        // Intenta formar grupos de diferentes tamaños
        for (const size of groupSizes) {
          const height = Math.min(size, rows - i)
          const width = Math.min(size / height, cols - j)
          // Si se puede formar un rectángulo del tamaño actual
          if (canFormRectangle(i, j, height, width)) {
            const group: number[][] = []
            // Agrega las coordenadas del grupo al array
            for (let x = 0; x < height; x++) {
              for (let y = 0; y < width; y++) {
                group.push([i + x, j + y])
              }
            }
            // Agrega el grupo al array de grupos
            groups.push(group)
            // Marca las celdas del grupo como visitadas
            markVisited(i, j, height, width)
            break
          }
        }
      }
    }
  }

  // Devuelve el array de grupos formados
  return groups
}
