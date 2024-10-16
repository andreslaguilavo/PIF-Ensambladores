import { useData } from '@/app/hooks/useData'
import {
  generateKarnaughMap,
  // getGroupsKarMap,
  getHeadersKarMap,
  getReduceExpression,
  referenceTableHeaders
} from '@/app/lib/karnaughMap'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@components/ui/table'

export default function KarnaughMapSolution() {
  const { data } = useData()
  if (!data) return null
  const variables = Object.keys(data?.data[0].variables)
  const results = data?.data.map((item) => {
    return item.results[item.results.length - 1].result
  })

  const karnaughData = generateKarnaughMap(variables, results)
  const [hRows, hCols] = getHeadersKarMap(variables)
  const reducedExpression = getReduceExpression(variables, karnaughData)
  return (
    <div className='flex flex-col gap-10'>
      <Table className='overflow-y-auto'>
        <TableCaption>Mapa de Karnaugh</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center font-extrabold'>
              {hRows.join('')}\{hCols.join('')}
            </TableHead>
            {referenceTableHeaders[variables.length].cols.map(
              (header, index: number) => (
                <TableHead key={index} className='text-center font-bold'>
                  {header}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow></TableRow>
          {karnaughData.map((row, index: number) => (
            <TableRow key={index}>
              <TableHead key={index} className='text-center font-bold'>
                {referenceTableHeaders[variables.length].rows[index]}
              </TableHead>
              {row.map((value, index: number) => (
                <TableCell key={index} className='text-center'>
                  {value ?? '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='text-center flex flex-col gap-2 '>
        La expresión reducida es: <br />
        <div className='flex flex-col gap-2'>
          <span className='font-bold'>R = {reducedExpression}</span>
          <small className='text-xs text-slate-400 font-light'>
            La expresión simplificada se obtuvo a partir de la minimización de
            los maxtérminos.
          </small>
        </div>
      </div>
    </div>
  )
}
