import { InfoCircledIcon } from '@radix-ui/react-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip'

export default function TooltipInfo() {
  return (
    <TooltipProvider delayDuration={0} >
      <Tooltip>
        <TooltipTrigger asChild>
          <span className='flex justify-center items-center w-fit p-1 relative cursor-pointer'>
            <div className='bg-blue-300/40 rounded-full absolute w-7 h-7 aspect-square z-0 animate-pulse' />
            <InfoCircledIcon className='text-blue-500 stroke-2 size-5 z-10' />
          </span>
        </TooltipTrigger>
        <TooltipContent side='right' >
          <p>Explicación</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
