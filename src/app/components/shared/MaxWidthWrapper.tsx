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
    <div className={cn('mx-auto w-full max-w-[1300px] h-full', className)}>
      {children}
    </div>
  )
}
