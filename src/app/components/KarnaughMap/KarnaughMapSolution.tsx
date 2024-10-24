import { useData } from '@/app/hooks/useData'
import {
  findGroups,
  generateKarnaughMap,
  getHeadersKarMap,
  getReduceExpression,
  referenceTableHeaders
} from '@/app/lib/karnaughMapCore'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@components/ui/table'
import { useState } from 'react'

export default function KarnaughMapSolution() {
  const { data } = useData()
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null)

  if (!data) return null

  const variables = Object.keys(data?.data[0].variables)
  const results = data?.data.map((item) => {
    return item.results[item.results.length - 1].result
  })

  const karnaughData = generateKarnaughMap(variables, results)
  const [hRows, hCols] = getHeadersKarMap(variables)
  const reducedExpression = getReduceExpression(variables, karnaughData)
  const groups1s = findGroups(karnaughData)

  return (
    <div className='flex flex-col gap-14'>
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
          {karnaughData.map((row, indexCol: number) => (
            <TableRow key={indexCol}>
              <TableHead key={indexCol} className='text-center font-bold'>
                {referenceTableHeaders[variables.length].rows[indexCol]}
              </TableHead>
              {row.map((value, indexRow: number) => (
                <TableCell
                  key={indexRow}
                  className={cn(
                    'text-center',
                    hoveredGroup !== null &&
                      groups1s[hoveredGroup].some(
                        ([x, y]) => x === indexCol && y === indexRow
                      ) &&
                      'bg-amber-300'
                  )}
                  data-cell-coordinate={[indexCol, indexRow]}
                >
                  {value ?? '-'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {groups1s.length > 0 && (
        <div className='flex flex-col gap-2'>
          <h3 className='text-center font-bold'>Grupos de 1's</h3>
          <div className='flex flex-col gap-2'>
            {groups1s.map((group, index) => (
              <div
                key={index}
                className='flex gap-2'
                onMouseEnter={() => setHoveredGroup(index)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <span className='font-bold'>Grupo {index + 1}:</span>
                <span>{group.map(([x, y]) => `[${x},${y}]`).join(', ')}</span>
              </div>
            ))}
          </div>
          <small className='text-xs text-slate-400 font-light text-center'>
            Visualiza los grupos en el mapa con pasando el mouse por encima de
            los grupos.
          </small>
        </div>
      )}
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
