import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import MaxTermSolution from '@components/MaxTerms/MaxTermSolution'
import MaxTermExplanation from '@components/MaxTerms/MaxTermExplanation'

export default function MaxTerms() {
  return (
    <section id='max-terms'>
      <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
        <h2>Max Términos</h2>
        <TabsTopic nameSection='max-terms'>
          <TabExplanation>
            <MaxTermExplanation />
          </TabExplanation>
          <TabSolution>
            <MaxTermSolution />
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-max-terms' />
    </section>
  )
}
