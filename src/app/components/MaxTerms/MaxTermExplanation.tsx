import { type DataValues, LogicTable } from '@components/shared/LogicTable'
import React from 'react'
const exampleMaxterms: DataValues = {
  headers: ['A', 'B', 'Salida'],
  data: [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 0]
  ]
}
export default function MaxTermExplanation() {
  return (
    <article className='flex flex-col gap-4'>
      <p>
        Los Max términos o productos en forma sumada son expresiones lógicas
        donde se suman las variables en su forma no negada o negada. Cada fila
        de la tabla de verdad que tenga salida "0" se convierte en un max
        término. Es utilizado para obtener la función en su forma Suma de
        Productos (SoP).
      </p>
      <div>
        <h3>Ejemplo:</h3>
        <LogicTable
          caption={
            <p className='text-center'>
              La función en su forma de max términos es:{' '}
              <span className='italic font-semibold'>
                ( A + !B ) ⋅ ( !A + !B )
              </span>
            </p>
          }
          dataValues={exampleMaxterms}
        />
      </div>
    </article>
  )
}
