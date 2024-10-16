import { LogicTable } from '@components/shared/LogicTable'

const logicTablesData = {
  AND: {
    headers: ['A', 'B', 'A AND B'],
    data: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ]
  },
  OR: {
    headers: ['A', 'B', 'A OR B'],
    data: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  NOT: {
    headers: ['A', 'NOT A'],
    data: [
      [0, 1],
      [1, 0]
    ]
  },
  XOR: {
    headers: ['A', 'B', 'A XOR B'],
    data: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ]
  },
  NAND: {
    headers: ['A', 'B', 'A NAND B'],
    data: [
      [0, 0, 1],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ]
  },
  NOR: {
    headers: ['A', 'B', 'A NOR B'],
    data: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 0]
    ]
  },
  XNOR: {
    headers: ['A', 'B', 'A XNOR B'],
    data: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1]
    ]
  }
}
export default function TruthTableExplanation() {
  return (
    <article className='flex flex-col gap-4'>
      <p>
        Las tablas de verdad son herramientas utilizadas para mostrar todas las
        posibles combinaciones de entradas de un circuito lógico y sus
        respectivas salidas. En la electrónica digital, cada entrada y salida
        toma valores binarios (0 o 1), y estas tablas son fundamentales para
        analizar y diseñar circuitos lógicos. Son esenciales para visualizar
        cómo un sistema digital procesa las señales y ayuda a verificar el
        funcionamiento correcto de un diseño lógico.
      </p>
      <div className='flex flex-col gap-2'>
        <h3 className='mb-2'>Operaciones lógicas en las tablas de verdad</h3>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5'>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>AND: </span>
            La operación AND toma dos o más entradas y solo produce una salida
            "1" cuando todas las entradas son "1". En cualquier otro caso, la
            salida será "0".
            <LogicTable caption='AND' dataValues={logicTablesData.AND} />
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>OR: </span>
            La operación OR genera una salida "1" si al menos una de las
            entradas es "1". Si todas las entradas son "0", la salida será "0".
            <LogicTable caption='OR' dataValues={logicTablesData.OR} />
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>NOT: </span>
            La operación NOT es una operación unaria que invierte la entrada. Si
            la entrada es "1", la salida será "0", y viceversa.
            <LogicTable caption='NOT' dataValues={logicTablesData.OR} />
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>NAND: </span>
            Es la operación inversa de AND. La salida es "0" solo si todas las
            entradas son "1". En cualquier otro caso, la salida es "1"
            <LogicTable caption='NAND' dataValues={logicTablesData.NAND} />
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>NOR: </span>
            Es la operación inversa de OR. La salida es "1" solo si todas las
            entradas son "0". Si alguna entrada es "1", la salida es "0".
            <LogicTable caption='NOR' dataValues={logicTablesData.NOR} />
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>XOR: </span>
            La operación XOR da una salida "1" solo si una y solo una de las
            entradas es "1". Si ambas entradas son iguales (ambas 0 o ambas 1),
            la salida es "0".
            <LogicTable caption='XOR' dataValues={logicTablesData.XOR} />
          </div>
          <div className='flex flex-col gap-2 border rounded-md p-5'>
            <span className='font-medium'>XNOR: </span>
            Es la operación inversa de XOR. La salida es "1" si las entradas son
            iguales (ambas 0 o ambas 1), y es "0" si son diferentes.
            <LogicTable caption='XNOR' dataValues={logicTablesData.XNOR} />
          </div>
        </div>
      </div>
    </article>
  )
}
