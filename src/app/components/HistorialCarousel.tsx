'use client'
import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

export default function HistorialCarousel({
  historial,
  onClickBadge
}: {
  historial: string[]
  onClickBadge: (value: string) => void
}) {
  if (historial.length === 0) {
    return (
      <p className='text-gray-500 w-full text-center'>
        No hay elementos en el historial
      </p>
    )
  }
  return (
    <div className='flex gap-20 relative w-full '>
      <Badge>Historial</Badge>
      <Carousel className='w-[75%]' opts={{ align: 'center' }}>
        <CarouselContent>
          {historial.map((item, index) => (
            <CarouselItem
              className='basis-auto sm:basis-1/2 lg:basis-1/4 text-center w-full'
              key={index}
              onClick={() => {
                onClickBadge(item)
              }}
            >
              <Badge className='bg-amber-400 text-black hover:text-white cursor-pointer px-3 w-full'>
                <p className='truncate'>
                {item}
                </p>
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
