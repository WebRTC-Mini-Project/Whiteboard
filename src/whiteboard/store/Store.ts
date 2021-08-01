import { WbStateType, WbActionType } from "../types/WbStateType";

export const wbReducer = (state: WbStateType, action: WbActionType): WbStateType => {
  console.log("store, action", action);
  switch (action.type) {
    case "tool":
      return { ...state, tool: action.tool };
    case "clear":
      return { ...state, clear: action.clear };
    case "capture":
      return { ...state, capture: action.capture };
    default:
      const invalid: never = action; // dispatch시 값이 없으면 에러 체크
      throw new Error(`unknow action type`);
  }
};

export const initialState: WbStateType = {
  tool: "pen",
  clear: false,
  capture: false,
};
