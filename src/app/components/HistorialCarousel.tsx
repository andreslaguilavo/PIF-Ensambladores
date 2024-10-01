'use client'
import { Badge } from '@components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@components/ui/carousel'

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
    <div className='flex flex-col md:flex-row md:gap-20 gap-5 relative w-full justify-center items-center md:justify-start'>
      <Badge className='w-full md:w-fit'>Historial</Badge>
      <Carousel className='w-[73%] ' opts={{ align: 'center' }}>
        <CarouselContent>
          {historial.map((item, index) => (
            <CarouselItem
              className='basis-1/2 lg:basis-1/4 text-center w-full'
              key={index}
              onClick={() => {
                onClickBadge(item)
              }}
            >
              <Badge className='bg-amber-400 text-black hover:text-white cursor-pointer px-3 w-full justify-center'>
                <p className='truncate' title={item}>{item}</p>
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
