import jsep, { type Expression } from 'jsep'

jsep.addBinaryOp('!&', 10) // Add Symbol for NAND
jsep.addBinaryOp('!|', 10) // Add Symbol for NOR
jsep.addBinaryOp('!^', 10) // Add Symbol for XOR
jsep.addBinaryOp('!^', 10) // Add Symbol for XOR

export type VariablesType = Record<string, boolean>
export type TruthTableData = ReturnType<typeof generateTruthTable>
export const generateTruthTable = (expression: string) => {
  // Get the variables from the expression
  const variables = expression.toUpperCase().match(/[A-Z]/g) as string[] | null
  const uniqueVariables = Array.from(new Set(variables))
  if (uniqueVariables === null) throw new Error('No hay variables')
  if (uniqueVariables?.length > 4) throw new Error('Demasiadas variables')
  if (uniqueVariables?.length < 2) throw new Error('Muy pocas variables')
  const truthTable = []

  for (let i = 0; i < 2 ** uniqueVariables.length; i++) {
    const row: Record<string, boolean> = {}
    uniqueVariables.forEach((variable, index) => {
      // Logic to create the truth table
      row[variable] = Boolean(i & (1 << (uniqueVariables.length - index - 1)))
    })
    // console.log('Resultado:', evaluateExpression(expression, row))
    console.log(row)
    truthTable.push({
      variables: row,
      results: evaluateExpression(expression.toUpperCase(), row)
    })
  }
  const headers = uniqueVariables.concat(
    truthTable[0].results.map((result) => result.expression)
  )
  return { headers, data: truthTable }
}

interface EquationsType {
  expression: string
  result: boolean
}

export const evaluateExpression = (
  expression: string,
  variables: VariablesType
) => {
  const equations: EquationsType[] = [] // Array to store the equations
  const ast = jsep(expression) // Parse the expression to an AST (Abstract Syntax Tree)
  evaluateAndAddValue(ast, variables, equations)
  // console.log('Ecuaciones registradas:', equations)
  return equations
}

function evaluateAndAddValue(
  node: Expression,
  variables: VariablesType,
  equations: EquationsType[]
): boolean {
  if (node.type === 'UnaryExpression') {
    const argument = evaluateAndAddValue(
      node.argument as Expression,
      variables,
      equations
    )
    node.value = !argument

    // Registrar la ecuación unaria
    const expression = `${node.operator as string}${
      ((node?.argument as Expression).name as string) ??
      getExpression(node?.argument as Expression)
    }`
    equations.push({ expression, result: node.value })

    return node.value
  } else if (node.type === 'BinaryExpression') {
    const left = evaluateAndAddValue(
      node.left as Expression,
      variables,
      equations
    )
    const right = evaluateAndAddValue(
      node.right as Expression,
      variables,
      equations
    )

    switch (node.operator) {
      case '&': // AND
        node.value = left && right
        break
      case '|': // OR
        node.value = left || right
        break
      case '!&': // NAND
        node.value = !(left && right)
        break
      case '!|': // NOR
        node.value = !(left || right)
        break
      case '^': // XOR
        node.value = left !== right
        break
      case '!^': // XNOR
        node.value = left === right
        break
      default:
        throw new Error(`Operador desconocido: ${node.operator as string}`)
    }

    // Registrar la ecuación binaria
    const leftExpression = getExpression(node.left as Expression)
    const rightExpression = getExpression(node.right as Expression)
    const expression = `${leftExpression} ${node.operator} ${rightExpression}`
    equations.push({
      expression,
      result: node.value
    })

    return node.value
  } else if (node.type === 'Identifier') {
    if (Object.prototype.hasOwnProperty.call(variables, node.name as string)) {
      node.value = variables[node.name as string]
      return node.value
    } else {
      throw new Error(`Variable no definida: ${node.name as string}`)
    }
  }

  throw new Error(`Tipo de nodo desconocido: ${node.type}`)
}

function getExpression(node: Expression): string {
  if (node.type === 'Identifier') {
    return node.name as string
  }
  if (node.type === 'UnaryExpression') {
    return `${node.operator as string}${getExpression(
      node.argument as Expression
    )}`
  }
  if (node.type === 'BinaryExpression') {
    const leftExpression = getExpression(node.left as Expression)
    const rightExpression = getExpression(node.right as Expression)
    return `(${leftExpression} ${node.operator as string} ${rightExpression})`
  }
  return ''
}
