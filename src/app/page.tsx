'use client'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import MaxWidthWrapper from '@components/shared/MaxWidthWrapper'
import HistorialCarousel from '@components/HistorialCarousel'
import { useState } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'
import { generateTruthTable, TruthTableData } from '@/app/lib/truthTableCore'
import TruthTable from '@components/TruthTable'
import MaxTerms from '@components/MaxTerms'
import TimeLine from '@components/TimeLine'
import MinTerms from '@components/MinTerms'
import KarnaughMap from '@components/KarnaughMap'
import { useData } from './hooks/useData'

export default function Home() {
  const [value, setValue] = useState('')
  const [historial, setHistorial] = useLocalStorage<string[]>('historial', [])
  const { setData } = useData()

  const saveHistorial = (value: string) => {
    setHistorial((prev) => {
      if (historial.length > 10) {
        historial.pop()
      }
      return [...new Set([value, ...prev])]
    })
  }
  const evalEquation = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (value === '') return
    saveHistorial(value)
    setValue('')
    const truthTable = generateTruthTable(value)
    setData(truthTable)
  }

  const updateInputByHistorial = (value: string) => {
    setValue(value)
  }
  return (
    <main className='min-h-screen font-firacode '>
      <MaxWidthWrapper>
        <div className='flex flex-col justify-center items-center gap-5'>
          <h1 className='font-display text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl xl:text-6.5xl text-center'>
            Conoce todas las <br /> compuertas lógicas
          </h1>
          <p>Ingresa una ecuación </p>
          <div className='flex flex-col w-full md:w-3/5 justify-center items-center gap-5'>
            <form onSubmit={evalEquation} className='flex w-full gap-5'>
              <Input
                placeholder='A+B'
                className='font-bold text-2xl h-14'
                value={value}
                onChange={(evt) => setValue(evt.target.value)}
              />
              <Button className='h-auto'>Enviar</Button>
            </form>

            <HistorialCarousel
              historial={historial}
              onClickBadge={updateInputByHistorial}
            />
          </div>

          <div className='relative w-full flex  gap-5'>
            <TimeLine />
            <div className='w-full'>
              <TruthTable />
              <MaxTerms />
              <MinTerms />
              <KarnaughMap />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  )
}
