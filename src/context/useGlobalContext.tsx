import { createContext, ReactNode, useContext, useReducer } from "react";

interface ChildrenProps {
  children: ReactNode;
}

export enum GlobalContextActionsTypes {
  SET_SIDEBAR = "SET_SIDEBAR",
  SET_VISIBLE_SECTION = "SET_VISIBLE_SECTION",
}

type SetSidebarAction = {
  type: GlobalContextActionsTypes.SET_SIDEBAR;
  setSidebar: "open" | "closed";
};

type SetVisibleSectionAction = {
  type: GlobalContextActionsTypes.SET_VISIBLE_SECTION;
  section: string;
};

type Action = SetSidebarAction | SetVisibleSectionAction;

interface State {
  isSidebarOpen: boolean;
  visibleSection: string;
}

type Dispatch = (action: Action) => void;

const initialState: State = {
  isSidebarOpen: false,
  visibleSection: "",
};

const globalReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case GlobalContextActionsTypes.SET_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: action.setSidebar === "open",
      };
    case GlobalContextActionsTypes.SET_VISIBLE_SECTION:
      return {
        ...state,
        visibleSection: action.section,
      };
    default:
      throw new Error("No action of this type exists!");
  }
};

export const GlobalContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const GlobalContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const value = { state, dispatch };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error("No provider for this context!");
  }

  return context;
};
