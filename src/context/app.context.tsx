import React, { createContext, useState } from 'react'
import { getCurrentTheme } from '~/utils/utils'

interface AppContextInterface {
  theme: 'dark' | 'light'
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>
}

const initialAppContext: AppContextInterface = {
  theme: getCurrentTheme(),
  setTheme: () => null
}

export const AppContext = createContext(initialAppContext)

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialAppContext.theme)
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
