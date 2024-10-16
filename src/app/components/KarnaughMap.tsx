import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import KarnaughMapSolution from '@components/KarnaughMap/KarnaughMapSolution'

export default function KarnaughMap() {
  return (
    <section id='karnaugh-map'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Mapa de Karnaugh </h2>
        <TabsTopic nameSection='karnaugh-map'>
          <TabExplanation>sdsagsakjhjhjksahdlkajsh</TabExplanation>
          <TabSolution>
            <KarnaughMapSolution />
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-karnaugh-map' />
    </section>
  )
}
