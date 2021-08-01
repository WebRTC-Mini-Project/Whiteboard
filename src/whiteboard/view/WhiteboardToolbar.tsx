// external
import styled from "styled-components";
import SendDataMessage from "../hook/DataMessage";

// internal
import { useWhiteboardState, useWhiteboardDispatch } from "../provider/Provider";

const toolbarItem = ["pen", "erase", "clear", "capture"] as const;
type ToolbarItem = typeof toolbarItem[number];

const WhiteboardToolbar = () => {
  const { tool, clear, capture } = useWhiteboardState();
  const WBDispatch = useWhiteboardDispatch();

  const setWhiteboardToolbarState = (item: ToolbarItem) => {
    // console.log("click item", item);

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
    }
  };

  // console.log(`current stateus: ${tool}, ${clear}, ${capture}`);

  return (
    <ToolbarInner>
      {toolbarItem.map((item: ToolbarItem, idx: number) => (
        <li key={idx} onClick={() => setWhiteboardToolbarState(item)}>
          {item}
        </li>
      ))}
    </ToolbarInner>
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
