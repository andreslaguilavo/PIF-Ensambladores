import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export default function MaxWidthWrapper({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('mx-auto max-w-[1300px] h-full p-5 sm:p-10 md:pt-36', className)}>
      {children}
    </div>
  )
}
