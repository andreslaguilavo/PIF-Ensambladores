import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from '@components/ui/table'

export interface DataValues {
  headers: string[]
  data: number[][]
}
export const LogicTable = ({
  caption,
  dataValues
}: {
  caption: string | JSX.Element
  dataValues: DataValues
}) => {
  return (
    <Table className='overflow-y-auto'>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {dataValues.headers.map((header: string) => (
            <TableHead key={header} className='text-center font-bold'>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataValues.data.map((row, index: number) => (
          <TableRow key={index}>
            {row.map((value, index: number) => (
              <TableCell key={index} className='text-center'>
                {value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
