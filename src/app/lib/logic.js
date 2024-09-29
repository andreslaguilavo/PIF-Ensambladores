import jsep from 'jsep'

// Agregar operadores XOR y XNOR
jsep.addBinaryOp('^', 10) // XOR
jsep.addBinaryOp('~^', 10) // XNOR
jsep.addBinaryOp('!^', 10) // XNOR


let equations = []
export const evaluateExpression = (expression, variables) => {
  // const variables = { A: false, B: false, C: true, D: false }
  const ast = jsep(expression)
  console.log('AST:', ast)
  evaluateAndAddValue(ast, variables)
  console.log('Ecuaciones registradas:', equations)
  console.log('Resultado:', ast.value)
  equations = []
  return ast.value
}

function evaluateAndAddValue(node, variables) {
  if (node.type === 'UnaryExpression') {
    const argument = evaluateAndAddValue(node.argument, variables)
    node.value = !argument

    // Registrar la ecuación unaria
    const expression = `${node.operator}${
      node.argument.name || getExpression(node.argument)
    }`
    equations.push(expression)

    return node.value
  } else if (node.type === 'BinaryExpression') {
    const left = evaluateAndAddValue(node.left, variables)
    const right = evaluateAndAddValue(node.right, variables)

    switch (node.operator) {
      case '&&':
        node.value = left && right
        break
      case '||':
        node.value = left || right
        break
      case '^': // XOR
        node.value = left !== right
        break
      case '!^': // XNOR
        node.value = left === right
        break
      default:
        throw new Error(`Operador desconocido: ${node.operator}`)
    }

    // Registrar la ecuación binaria
    const leftExpression = getExpression(node.left)
    const rightExpression = getExpression(node.right)
    const expression = `${leftExpression} ${node.operator} ${rightExpression}`
    equations.push(expression)

    return node.value
  } else if (node.type === 'Identifier') {
    if (variables.hasOwnProperty(node.name)) {
      node.value = variables[node.name]
      return node.value
    } else {
      throw new Error(`Variable no definida: ${node.name}`)
    }
  }

  throw new Error(`Tipo de nodo desconocido: ${node.type}`)
}

function getExpression(node) {
  if (node.type === 'Identifier') {
    return node.name
  } else if (node.type === 'UnaryExpression') {
    return `${node.operator}${getExpression(node.argument)}`
  } else if (node.type === 'BinaryExpression') {
    const leftExpression = getExpression(node.left)
    const rightExpression = getExpression(node.right)
    return `(${leftExpression} ${node.operator} ${rightExpression})`
  }
  return ''
}

// export const getEquations = () => equations

// Ejemplo de uso
// const variables = { A: false, B: true, C: true, D: false }
// const expression = '(!(A && B) ^ C) || !B'

// evaluateExpression(expression, variables)
