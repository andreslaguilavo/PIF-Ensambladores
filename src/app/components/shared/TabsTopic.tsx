import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import Portal from './Portal'
import {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactElement
} from 'react'
import { useData } from '@/app/hooks/useData'
import { useTab } from '@/app/hooks/useTab'

interface TabsTopicProps {
  children:
  | ReactElement<typeof TabExplanation>
  | ReactElement<typeof TabSolution>
  | [ReactElement<typeof TabExplanation>, ReactElement<typeof TabSolution>]
  nameSection: string
}

export function TabsTopic({ children, nameSection }: TabsTopicProps) {
  const [tab, setTab] = useState('explanation')
  const { currentTab } = useTab()
  const handleChange = (value: string) => {
    setTab(value)
  }
  useEffect(() => {
    setTab(currentTab)
  }, [currentTab])
  return (
    <Tabs value={tab} onValueChange={handleChange}>
      <TabsList className='grid w-full grid-cols-2 bg-amber-200'>
        <TabsTrigger value={'explanation'}>Explicación</TabsTrigger>
        <TabsTrigger value={'solution'}>Solución</TabsTrigger>
      </TabsList>
      <Portal containerId={`portal-${nameSection}`}>{children}</Portal>
    </Tabs>
  )
}

export const TabExplanation = (props: PropsWithChildren) => {
  return <TabsContent value='explanation'>{props.children}</TabsContent>
}

export const TabSolution = (props: PropsWithChildren) => {
  const { data } = useData()
  if (data === null) {
    return (
      <TabsContent value='solution'>
        <div className='text-center'>
          No hay datos. Ingresa una ecuación para ver su solución
        </div>
      </TabsContent>
    )
  }
  return <TabsContent value='solution'>{props.children}</TabsContent>
}
