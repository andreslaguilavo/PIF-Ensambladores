'use client'

import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import TruthTableSolution from '@components/TruthTable/TruthTableSolution'
import TruthTableExplanation from '@components/TruthTable/TruthTableExplanation'

export default function TruthTable() {
  return (
    <section id='truth-table'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Tabla de verdad </h2>
        <TabsTopic nameSection='truth-table'>
          <TabExplanation>
            <TruthTableExplanation/>
          </TabExplanation>
          <TabSolution>
          <TruthTableSolution/>
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-truth-table' />
    </section>
  )
}
