import { DataProvider } from '@/app/hooks/useData'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DataProvider>{children}</DataProvider>
    </>
  )
}
