import { createContext, ReactNode, useContext, useReducer } from "react";

type ChildrenProps = {
  children: ReactNode;
};

export type Location = {
  bottom: number;
  center: number;
};

export enum TooltipActionTypes {
  CREATE_TOOLTIP = "CREATE_TOOLTIP",
  DELETE_TOOLTIP = "DELETE_TOOLTIP",
}

export type CreateTooltip = {
  type: TooltipActionTypes.CREATE_TOOLTIP;
  text: string;
  location: Location;
};

export type DeleteTooltip = {
  type: TooltipActionTypes.DELETE_TOOLTIP;
};

type Action = CreateTooltip | DeleteTooltip;

type State = {
  tooltip: {
    text: string;
    location: { bottom: number; center: number };
  };
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  tooltip: {
    text: "",
    location: { bottom: -1, center: -1 },
  },
};

const TooltipReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case TooltipActionTypes.CREATE_TOOLTIP:
      return {
        ...state,
        tooltip: { text: action.text, location: action.location },
      };
    case TooltipActionTypes.DELETE_TOOLTIP:
      return {
        ...state,
        tooltip: { ...initialState.tooltip },
      };
    default:
      throw new Error("No action of this type exists!");
  }
};

export const TooltipContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const TooltipProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(TooltipReducer, initialState);

  const value = { state, dispatch };

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);

  if (context === undefined) {
    throw new Error("No value provided for context!");
  }

  return context;
};
