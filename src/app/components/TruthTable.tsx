'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@components/ui/table'
import {
  TabExplanation,
  TabSolution,
  TabsTopic
} from '@components/shared/TabsTopic'
import { useData } from '../hooks/useData'

export default function TruthTable() {
  const { data } = useData()
  console.log(data)
  return (
    <section id='truth-table'>
      <div className='flex gap-4 items-center justify-between'>
        <h2>Tabla de verdad </h2>
        <TabsTopic nameSection='truth-table'>
          <TabExplanation>sdsagsakjhjhjksahdlkajsh</TabExplanation>
          <TabSolution>
            <Table className='overflow-y-auto'>
              <TableCaption>Tabla de verdad</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='min-w'></TableHead>
                  {data?.headers?.map((header: string) => (
                    <TableHead key={header} className='text-center font-bold'>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((row, index: number) => (
                  <TableRow key={index}>
                    <TableCell className='text-center text-xs text-gray-400 min-w'>
                      {index}
                    </TableCell>

                    {/* Render values of the variables */}
                    {Object.values(row.variables).map(
                      (value: boolean, index: number) => (
                        <TableCell key={index} className='text-center'>
                          {value ? '1' : '0'}
                        </TableCell>
                      )
                    )}

                    {/* Render results of the equations */}
                    {row.results.map((result, index: number) => (
                      <TableCell key={index} className='text-center'>
                        {result.result ? '1' : '0'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabSolution>
        </TabsTopic>
      </div>
      <div id='portal-truth-table' />
    </section>
  )
}
