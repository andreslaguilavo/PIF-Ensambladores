import TooltipInfo from '@components/shared/TooltipInfo'
import type { TruthTableData } from '@/app/lib/truthTableCore'
import { getMaxTerms } from '@/app/lib/maxTerms'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip'
import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'

export default function MaxTerms({ data }: { data: TruthTableData }) {
  const maxTerms = getMaxTerms(data.data)
  return (
    <section id='max-terms'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Max Términos</h2>
        <TabsTopic nameSection='max-terms'>
          <TabExplanation>sdsagsakjhjhjksahdlkajsh</TabExplanation>
          <TabSolution>
            <div className='text-center'>
              {maxTerms.map((maxTerm) => (
                <TooltipProvider key={maxTerm.index} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{maxTerm.maxTerm}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Indice : {maxTerm.index}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-max-terms' />
    </section>
  )
}
