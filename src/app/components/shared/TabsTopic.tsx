import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import Portal from './Portal'
import type { PropsWithChildren, ReactElement } from 'react'

interface TabsTopicProps {
  children:
  | ReactElement<typeof TabExplanation>
  | ReactElement<typeof TabSolution>
  | [ReactElement<typeof TabExplanation>, ReactElement<typeof TabSolution>]
  nameSection: string
}

export function TabsTopic({ children, nameSection }: TabsTopicProps) {
  return (
    <Tabs defaultValue='explanation'>
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
  return <TabsContent value='solution'>{props.children}</TabsContent>
}
