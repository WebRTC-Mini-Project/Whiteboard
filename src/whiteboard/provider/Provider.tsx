import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { WbStateType, WbActionType } from "../types/WbStateType";
import { wbReducer, initialState } from "../store/Store";

type WbToolbarDispatch = Dispatch<WbActionType>;

const WbToolbarContext = createContext<WbStateType | null>(null);
const WbToolbarDispatchContext = createContext<WbToolbarDispatch>(() => null);

export const WhiteboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [wbState, wbDispatch] = useReducer(wbReducer, initialState);

  return (
    <WbToolbarContext.Provider value={wbState}>
      <WbToolbarDispatchContext.Provider value={wbDispatch}>{children}</WbToolbarDispatchContext.Provider>
    </WbToolbarContext.Provider>
  );
};

// hook state, dispatch
export const useWhiteboardState = (): WbStateType => {
  const state = useContext(WbToolbarContext);
  if (!state) throw new Error("Cannot find WB State");
  return state;
};

export const useWhiteboardDispatch = (): WbToolbarDispatch => {
  const dispatch = useContext(WbToolbarDispatchContext);
  if (!dispatch) throw new Error("Cannot find WB Dispatch");
  return dispatch;
};
