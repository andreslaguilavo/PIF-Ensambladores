import { type DataValues, LogicTable } from '@components/shared/LogicTable'

const exampleKarMap: DataValues = {
  headers: ['A/B', '0', '1'],
  data: [
    [0, 1, 0],
    [1, 1, 0]
  ]
}
export default function KarnaughMapExplanation() {
  return (
    <article className='flex flex-col gap-4'>
      <p>
        El mapa de Karnaugh es una herramienta visual que ayuda a simplificar
        funciones lógicas, representando min términos o max términos en una
        cuadrícula. Agrupando los valores iguales (generalmente 1 para min
        términos), permite reducir ecuaciones lógicas complejas a su forma más
        simple. Esto es esencial en el diseño de circuitos electrónicos, ya que
        menos términos implican menos puertas lógicas y, por lo tanto, circuitos
        más eficientes.
      </p>
      <div>
        <h3>Ejemplo:</h3>
        <LogicTable caption={''} dataValues={exampleKarMap} />
        <p>
          En este caso, podemos agrupar los "1" que están en la columna de B = 0
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <h3>Ecuación reducida</h3>
        <p>
          La ecuación reducida es el resultado de simplificar la función lógica
          usando herramientas como el mapa de Karnaugh o las propiedades
          algebraicas. La simplificación busca reducir el número de términos y,
          por lo tanto, la cantidad de puertas lógicas necesarias para
          implementar la función.
        </p>
        <p>
          Partiendo del ejemplo anterior, donde hemos simplificado la función
          lógica usando el mapa de Karnaugh, la ecuación reducida es:
          <span className='italic font-semibold'>!B</span>
        </p>
        <p>
          Esto significa que el circuito solo dependería de la condición B = 0,
          lo que reduce la complejidad del diseño lógico.
        </p>
      </div>
    </article>
  )
}
