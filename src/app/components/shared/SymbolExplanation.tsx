import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@components/ui/dialog'
import { InfoCircledIcon } from '@radix-ui/react-icons'

export default function SymbolExplanation() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='hover:bg-blue-300/70 flex justify-center items-center p-1 relative cursor-pointer bg-blue-300/40 rounded-full w-7 h-7 aspect-square'>
          <InfoCircledIcon className='text-blue-500 stroke-2 size-5 z-10' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Explicación de Símbolos</DialogTitle>
          <DialogDescription>
            Aquí se explica el significado de cada símbolo en las ecuaciones de
            compuertas lógicas
          </DialogDescription>
        </DialogHeader>
        <ul className='flex flex-col gap-4 py-4 justify-center items-center'>
          <li>
            <strong>&</strong>: Operador AND
          </li>
          <li>
            <strong>|</strong>: Operador OR
          </li>
          <li>
            <strong>!</strong>: Operador NOT
          </li>
          <li>
            <strong>^</strong>: Operador XOR
          </li>
          <li>
            <strong>!&</strong>: Operador NAND
          </li>
          <li>
            <strong>!|</strong>: Operador NOR
          </li>
          <li>
            <strong>!^</strong>: Operador XNOR
          </li>
        </ul>
        <span className='font-light italic'></span>
        <DialogFooter>
          <DialogDescription className='text-center'>
            Use mínimo 2 variables y máximo 4 variables en su ecuación.
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
