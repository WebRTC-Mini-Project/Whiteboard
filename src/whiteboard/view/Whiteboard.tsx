// external
import Konva from "konva";
import io from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";

// internal
import WhiteboardToolbar from "./WhiteboardToolbar";

type LineType = { tool: string; points: [x: number, y: number] };

const Whiteboard = () => {
  const socket = io("/wb");

  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState<any>([]);
  const linesRef = useRef<any>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    setLines([...lines, { tool, points: [pos?.x, pos?.y] }]);
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (isDrawing.current === false) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine?.points.concat([point?.x, point?.y]);

    // replace last
    // lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    linesRef.current = lines;
  };

  const handleMouseUp = () => {
    const lastLine: LineType = lines[lines.length - 1];
    console.log(`Limit size: ${JSON.stringify(Object.values(lastLine)).length}`);

    if (JSON.stringify(Object.values(lastLine)).length < 600) {
      console.log(`send to lines!!`);
      socket.emit("pos", lastLine);
    } else {
      console.log(`not passed`);
      isDrawing.current = false;
      return;
    }

    isDrawing.current = false;
  };

  useEffect(() => {
    socket.on("pos", (data: LineType) => {
      // console.log(`client recived ${JSON.stringify(data)}`);

      let newLines = [
        ...linesRef.current,
        {
          tool: data.tool,
          points: data.points,
        },
      ];

      setLines(newLines.concat());
      linesRef.current = newLines.concat();
    });
  }, []);
  // console.log("local", lines, "linesRef", linesRef.current);

  return (
    <div>
      <WhiteboardToolbar />
      <Stage
        style={{ border: "1px red solid" }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line: LineType, i: number) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === "eraser" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </div>
  );
};

export default Whiteboard;
