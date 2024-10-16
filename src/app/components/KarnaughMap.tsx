import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import KarnaughMapSolution from '@components/KarnaughMap/KarnaughMapSolution'
import KarnaughMapExplanation from './KarnaughMap/KarnaughMapExplanation'

export default function KarnaughMap() {
  return (
    <section id='karnaugh-map'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Mapa de Karnaugh </h2>
        <TabsTopic nameSection='karnaugh-map'>
          <TabExplanation><KarnaughMapExplanation/></TabExplanation>
          <TabSolution>
            <KarnaughMapSolution />
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-karnaugh-map' />
    </section>
  )
}
