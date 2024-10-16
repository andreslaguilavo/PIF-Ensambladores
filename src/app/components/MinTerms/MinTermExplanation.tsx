import { type DataValues, LogicTable } from '@components/shared/LogicTable'

const exampleMinterms: DataValues = {
  headers: ['A', 'B', 'Salida'],
  data: [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
    [1, 1, 0]
  ]
}
export default function MinTermExplanation() {
  return (
    <article className='flex flex-col gap-4'>
      <p>
        Los Min términos o sumas en forma de producto son expresiones en las que
        se multiplican las variables (en forma no negada o negada). Cada fila de
        la tabla de verdad que tenga salida "1" se convierte en un min término.
        Se usa para obtener la función en su forma Producto de Sumas (PoS)
      </p>
      <div>
        <h3>Ejemplo</h3>
        <LogicTable
          caption={
            <p className='text-center'>
              La función en su forma de min términos es:{' '}
              <span className='italic font-semibold'>
                ( !A ⋅ !B ) + ( A + !B )
              </span>
            </p>
          }
          dataValues={exampleMinterms}
        />
      </div>
    </article>
  )
}
