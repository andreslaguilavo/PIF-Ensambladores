'use client'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import MaxWidthWrapper from '@components/shared/MaxWidthWrapper'
import HistorialCarousel from '@components/HistorialCarousel'
import { useState } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'
import { generateTruthTable } from '@/app/lib/truthTableCore'
import TruthTable from '@components/TruthTable'
import MaxTerms from '@components/MaxTerms'
import TimeLine from '@components/TimeLine'
import MinTerms from '@components/MinTerms'
import KarnaughMap from '@components/KarnaughMap'
import { useData } from '@/app/hooks/useData'
import { useTab } from '@/app/hooks/useTab'
import { toast } from 'sonner'
import SymbolExplanation from '@components/shared/SymbolExplanation'

export default function Home() {
  const [value, setValue] = useState('')
  const [historial, setHistorial] = useLocalStorage<string[]>('historial', [])
  const { setCurrentTab } = useTab()
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
    try {
      const truthTable = generateTruthTable(value)
      saveHistorial(value)
      setValue('')
      setData(truthTable)
      setCurrentTab('solution')
    } catch (error: unknown) {
      toast.error('Error al evaluar la ecuación : ' + (error as string))
    }
  }

  const updateInputByHistorial = (value: string) => {
    setValue(value)
  }
  return (
    <main className='min-h-screen font-firacode relative'>
      <div className='absolute inset-0 -z-10  w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'/>
      <MaxWidthWrapper>
        <div className='flex flex-col justify-center items-center gap-5'>
          <h1 className='font-display text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl xl:text-6.5xl text-center'>
            Conoce todas las <br /> compuertas lógicas
          </h1>
          <div className='flex items-center gap-2'>
            <p>Ingresa una ecuación </p>
            <SymbolExplanation />
          </div>
          <div className='flex flex-col w-full md:w-3/5 justify-center items-center gap-5'>
            <form onSubmit={evalEquation} className='flex w-full gap-5'>
              <Input
                placeholder='A+B'
                className='font-bold text-2xl h-14 bg-white'
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
