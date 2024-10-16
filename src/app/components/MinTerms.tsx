import type { TruthTableData } from '@/app/lib/truthTableCore'
import { getMinTerms } from '@/app/lib/minTerms'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip'
import { Fragment } from 'react'
import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import MinTermSolution from '@components/MinTerms/MinTermSolution'

export default function MinTerms() {
  return (
    <section id='min-terms'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Min Términos</h2>
        <TabsTopic nameSection='min-terms'>
          <TabExplanation>sdsagsakjhjhjksahdlkajsh</TabExplanation>
          <TabSolution>
            <MinTermSolution />
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-min-terms' />
    </section>
  )
}
