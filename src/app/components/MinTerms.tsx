import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import MinTermSolution from '@components/MinTerms/MinTermSolution'
import MinTermExplanation from './MinTerms/MinTermExplanation'

export default function MinTerms() {
  return (
    <section id='min-terms'>
      <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
        <h2>Min Términos</h2>
        <TabsTopic nameSection='min-terms'>
          <TabExplanation>
            <MinTermExplanation />
          </TabExplanation>
          <TabSolution>
            <MinTermSolution />
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-min-terms' />
    </section>
  )
}
