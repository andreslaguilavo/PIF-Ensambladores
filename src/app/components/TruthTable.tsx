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
import type { TruthTableData } from '@/app/lib/truthTableCore'
import TooltipInfo from '@components/shared/TooltipInfo'

export default function TruthTable({ data }: { data: TruthTableData }) {
  return (
    <section id='truth-table'>
      <div className='flex gap-4'>
        <h2>Tabla de verdad </h2>
        <TooltipInfo />
      </div>
      <Table className='overflow-y-auto'>
        <TableCaption>A list of your recent costs.</TableCaption>
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
    </section>
  )
}
