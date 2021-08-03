// external
import React, { ChangeEventHandler, useState } from "react";
import styled from "styled-components";
import SendDataMessage from "../hook/DataMessage";

// internal
import { useWhiteboardState, useWhiteboardDispatch } from "../provider/Provider";

const toolbarItem = ["pen", "pen-tool", "erase", "clear", "capture"] as const;
const pentoolItem = ["black", "red", "pink"] as const;

export type ToolbarItem = typeof toolbarItem[number];
export type PentoolItem = typeof pentoolItem[number];
export type PenColorItem = {
  color: PentoolItem;
};

const WhiteboardToolbar = () => {
  const { clear, capture, fontWeight } = useWhiteboardState();
  const WBDispatch = useWhiteboardDispatch();
  const [fontWeightState, setFontWeight] = useState(1);
  const [penToolOpen, setPenToolOpen] = useState(false);

  const setWhiteboardToolbarState = (item: ToolbarItem | PenColorItem) => {
    // console.log("click item", item);

    item === "pen-tool" && setPenToolOpen(!penToolOpen); // pen-tool open/close

    switch (item) {
      case "pen":
        WBDispatch({ type: "tool", tool: "pen" });
        return;
      case "erase":
        WBDispatch({ type: "tool", tool: "erase" });
        return;
      case "clear":
        WBDispatch({ type: "clear", clear: clear ? false : true });
        SendDataMessage("clear", true);
        return;
      case "capture":
        WBDispatch({ type: "capture", capture: capture ? false : true });
        return;
      default:
        WBDispatch({ type: "color", color: Object.values(item).toString() });
        console.log(item);
    }
  };

  const setFontWeightFunc = () => {
    WBDispatch({ type: "fontWeight", fontWeight: fontWeightState });
  };

  return (
    <>
      <ToolbarInner>
        {toolbarItem.map((item: ToolbarItem, idx: number) => (
          <li key={idx} onClick={() => setWhiteboardToolbarState(item)}>
            {item}
          </li>
        ))}
      </ToolbarInner>

      {/* pen-tool */}
      {penToolOpen === true && (
        <>
          <PenTool>
            {pentoolItem.map((item: PentoolItem, idx: number) => (
              <PenToolColor color={item} key={idx} onClick={() => setWhiteboardToolbarState({ color: item })}>
                {item}
              </PenToolColor>
            ))}
            {/* slider bar */}
            <SliderContainer>
              <input type="range" min="1" max="30" onChange={(e: any) => setFontWeight(e.target.value)} onMouseUp={setFontWeightFunc} value={fontWeightState} />
              <label htmlFor="fontSize" style={{ margin: "10px" }}>
                {fontWeight}pt
              </label>
            </SliderContainer>
          </PenTool>
        </>
      )}
    </>
  );
};

export default WhiteboardToolbar;

const ToolbarInner = styled.ul`
  border: 1px red solid;
  width: 500px;
  margin: 50px 0 0;

  li {
    display: inline-block;
    margin: 0 20px;
    padding: 20px 0;
    border: 1px red solid;
    cursor: pointer;
  }
`;

const PenTool = styled.div`
  border: 2px red dashed;
  position: absolute;
  width: 300px;
  height: 100px;
  left: 5%;
  z-index: 3;
  text-align: center;
`;

const PenToolColor = styled.em`
  border: 1px solid black;
  border-radius: 50%;
  margin: 0 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: ${({ color }) => color};
  background-color: ${({ color }) => color};
`;

const SliderContainer = styled.div`
  margin: 20px 0;

  input {
    background-color: #888888;
    border-radius: 20px;
    :hover {
      cursor: pointer;
    }
  }
`;
