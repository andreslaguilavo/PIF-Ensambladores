import React from 'react'
import type { TruthTableData } from '@/app/lib/truthTableCore'
import {
  generateKarnaughMap,
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

export default function KarnaughMap({ data }: { data: TruthTableData }) {
  const variables = Object.keys(data?.data[0].variables)
  const results = data?.data.map((item) => {
    return item.results[item.results.length - 1].result
  })

  const karnaughData = generateKarnaughMap(variables, results)
  console.log(karnaughData)

  return (
    <section id='karnaugh-map'>
      <div className='flex gap-4'>
        <h2>Mapa de Karnaugh </h2>
      </div>
      <Table className='overflow-y-auto'>
        <TableCaption>Mapa de Karnaugh</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w'></TableHead>
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
          <TableRow>
          </TableRow>
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
          {/* {data?.data?.map((row, index: number) => (
            <TableRow key={index}>
              <TableCell className='text-center text-xs text-gray-400 min-w'>
                {index}
              </TableCell>

              {Object.values(row.variables).map(
                (value: boolean, index: number) => (
                  <TableCell key={index} className='text-center'>
                    {value ? '1' : '0'}
                  </TableCell>
                )
              )}

              {row.results.map((result, index: number) => (
                <TableCell key={index} className='text-center'>
                  {result.result ? '1' : '0'}
                </TableCell>
              ))}
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </section>
    // <table>
    //   <thead>
    //     <tr>
    //       <th></th>
    //       {headers}
    //     </tr>
    //   </thead>
    //   <tbody className='m-10'>
    //     {truthTable.map((row, rowIndex) => (
    //       <tr key={rowIndex} className=''>
    //         <th className='mx-10'>AB = {rowIndex.toString(2).padStart(2, '0')}</th>
    //         {row.map((value, colIndex) => (
    //           <td
    //             key={colIndex}
    //             className='border border-black text-center m-10'
    //           >
    //             {value !== null ? value : '-'}{' '}
    //             {/* Mostrar el valor o un guion si es nulo */}
    //           </td>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  )
}
