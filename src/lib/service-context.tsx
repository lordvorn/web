import { createContext, useContext, useState, type ReactNode } from 'react'

interface SelectedService {
  index: number
  title: string
}

interface ServiceContextValue {
  selectedService: SelectedService | null
  setSelectedService: (s: SelectedService | null) => void
}

export const ServiceContext = createContext<ServiceContextValue>({
  selectedService: null,
  setSelectedService: () => {},
})

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null)
  return (
    <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </ServiceContext.Provider>
  )
}

export const useService = () => useContext(ServiceContext)
