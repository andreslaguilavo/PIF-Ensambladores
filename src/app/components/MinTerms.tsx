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

export default function MinTerms({ data }: { data: TruthTableData }) {
  const minTerms = getMinTerms(data.data)
  return (
    <section id='min-terms'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Min Términos</h2>
        <TabsTopic nameSection='min-terms'>
          <TabExplanation>sdsagsakjhjhjksahdlkajsh</TabExplanation>
          <TabSolution>
            {' '}
            <div className='text-center'>
              {minTerms.map((minTerm, index) => (
                <Fragment key={minTerm.index}>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{minTerm.minTerm}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Indice : {minTerm.index}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span>{index !== minTerms.length - 1 ? ' + ' : ''}</span>
                </Fragment>
              ))}
            </div>
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-min-terms' />
    </section>
  )
}
