import React, { createContext, useState } from 'react'
import { getCurrentTheme } from '~/utils/utils'

interface AppContextInterface {
  theme: 'dark' | 'light'
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>
  openMenu: boolean
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  theme: getCurrentTheme(),
  setTheme: () => null,
  openMenu: false,
  setOpenMenu: () => null
}

export const AppContext = createContext(initialAppContext)

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(initialAppContext.theme)
  const [openMenu, setOpenMenu] = useState<boolean>(initialAppContext.openMenu)
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        openMenu,
        setOpenMenu
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
