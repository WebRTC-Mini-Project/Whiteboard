export type WbStateType = {
  tool: ToolType;
  clear: boolean;
  capture: boolean;
  color: string;
  fontWeight: number;
};

export type WbActionType =
  | { type: "tool"; tool: ToolType }
  | { type: "clear"; clear: boolean }
  | { type: "capture"; capture: boolean }
  | { type: "color"; color: string }
  | { type: "fontWeight"; fontWeight: number };

export type ToolType = "pen" | "erase";
