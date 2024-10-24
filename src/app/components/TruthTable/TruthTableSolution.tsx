import { useData } from '@/app/hooks/useData'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@components/ui/table'

export default function TruthTableSolution() {
  const { data } = useData()
  if (!data) return null
  return (
    <Table className='overflow-y-auto'>
    <TableCaption>Tabla de verdad</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className='min-w'></TableHead>
        {data?.headers?.map((header: string, index: number) => (
          <TableHead key={index} className='text-center font-bold'>
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
  )
}
