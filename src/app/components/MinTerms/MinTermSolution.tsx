import { getMinTerms } from '@/app/lib/minTerms'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip'
import { useData } from '@/app/hooks/useData'
import { Fragment } from 'react'

export default function MinTermSolution() {
  const { data } = useData()
  if (!data) return null
  const minTerms = getMinTerms(data.data)
  return (
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
  )
}
