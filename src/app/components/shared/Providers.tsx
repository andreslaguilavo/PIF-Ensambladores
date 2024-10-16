import { DataProvider } from '@/app/hooks/useData'
import { TabProvider } from '@/app/hooks/useTab'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DataProvider>
        <TabProvider>{children}</TabProvider>
      </DataProvider>
    </>
  )
}
