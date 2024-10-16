import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import MaxTermSolution from '@components/MaxTerms/MaxTermSolution'

export default function MaxTerms() {

  return (
    <section id='max-terms'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Max Términos</h2>
        <TabsTopic nameSection='max-terms'>
          <TabExplanation>sdsagsakjhjhjksahdlkajsh</TabExplanation>
          <TabSolution>
            <MaxTermSolution/>
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-max-terms' />
    </section>
  )
}
