import { createContext, useContext } from "react"

interface AppCtxInterface {
  isSidebarOpen: boolean,
  setSidebar: (value: boolean) => void
}

const initialState = {
  isSidebarOpen: false,
  setSidebar: (value: boolean) => console.log('sidebar closed')
}

export const GlobalContext = createContext<AppCtxInterface>(initialState);

export const useGlobalContext = () => useContext(GlobalContext);
