import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  containerId: string
}

export default function Portal({ children, containerId }: PortalProps) {
  if (typeof window === 'undefined') return
  const container = window.document.getElementById(containerId)
  return container !== null ? createPortal(children, container) : null
}
