'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MaxWidthWrapper from '@components/shared/MaxWidthWrapper'
// import jsep from 'jsep'
import HistorialCarousel from '@components/HistorialCarousel'
import { useState } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

export default function Home() {
  const [value, setValue] = useState('')
  const [historial, setHistorial] = useLocalStorage<string[]>('historial', [])

  const evalEquation = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setHistorial((prev) => {
      if (historial.length > 10) {
        historial.pop()
      }
      return [value, ...prev]
    })
    setValue('')
  }

  const updateInputByHistorial = (value: string) => {
    setValue(value)
  }
  console.log(historial)
  return (
    <main className='my-10'>
      <MaxWidthWrapper>
        <div className='flex flex-col justify-center items-center gap-5'>
          <h1 className='font-display text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl xl:text-6.5xl text-center'>
            Conoce todas las <br /> compuertas lógicas
          </h1>
          <p>Ingresa una ecuación </p>
          <div className='flex flex-col w-3/5 justify-center items-center gap-5'>
            <form onSubmit={evalEquation} className='flex w-full gap-5'>
              <Input
                placeholder='A+B'
                className=''
                value={value}
                onChange={(evt) => setValue(evt.target.value)}
              />
              <Button>Enviar</Button>
            </form>

            <HistorialCarousel
              historial={historial}
              onClickBadge={updateInputByHistorial}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
