import { createContext, useContext } from "react";

interface AppCtxInterface {
  isSidebarOpen: boolean;
  setSidebar: (value: boolean) => void;
  visibleSection: string;
  setVisibleSection: (section: string) => void;
}

const initialState = {
  isSidebarOpen: false,
  setSidebar: (value: boolean) => console.log("sidebar closed"),
  visibleSection: "",
  setVisibleSection: (section: string) => console.log("visible section"),
};

export const GlobalContext = createContext<AppCtxInterface>(initialState);

export const useGlobalContext = () => useContext(GlobalContext);
