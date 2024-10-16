/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { getMaxTerms } from '@/app/lib/maxTermsCore'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip'
import { useData } from '@/app/hooks/useData'

export default function MaxTermSolution() {
  const { data } = useData()
  if (!data) return null
  const maxTerms = getMaxTerms(data?.data)
  return (
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
  )
}
