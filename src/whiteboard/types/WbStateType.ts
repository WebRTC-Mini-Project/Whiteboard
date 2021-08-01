export type WbStateType = {
  tool: ToolType;
  clear: boolean;
  capture: boolean;
};

export type WbActionType = { type: "tool"; tool: ToolType } | { type: "clear"; clear: boolean } | { type: "capture"; capture: boolean };

export type ToolType = "pen" | "erase";
