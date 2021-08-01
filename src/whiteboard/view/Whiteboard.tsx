// external
import Konva from "konva";
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import io from "socket.io-client";

// internal
import WhiteboardToolbar from "./WhiteboardToolbar";
import { useWhiteboardState, useWhiteboardDispatch } from "../provider/Provider";
import SendDataMessage from "../hook/DataMessage";
import PencilCursor from "../../image/Pencil-Cursor.svg";
import EraserCursor from "../../image/Eraser-Cursor.svg";

type LineType = { tool: string; points: [x: number, y: number] };

const socket = io("/wb");

const Whiteboard = () => {
  const { tool, clear, capture } = useWhiteboardState();
  const WBDispatch = useWhiteboardDispatch();

  const [lines, setLines] = useState<any>([]);
  const linesRef = useRef<any>([]);
  const isDrawing = useRef(false);
  const WBContainerRef = useRef<any>(null); // Todo 타입 체크 필요..
  const layerRef = useRef<any>(null); // Todo 타입 체크 필요..

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

    setLines(lines.concat());
    linesRef.current = lines;
  };

  const handleMouseUp = () => {
    const lastLine: LineType = lines[lines.length - 1];
    console.log(`Limit size: ${JSON.stringify(Object.values(lastLine)).length}`);

    if (JSON.stringify(Object.values(lastLine)).length < 600) {
      console.log(`send to lines!!`);
      SendDataMessage("draw", lastLine);
    } else {
      console.log(`not draw`);
      isDrawing.current = false;
      return;
    }

    isDrawing.current = false;
  };

  const downloadURI = (uri: string) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let link = document.createElement("a");
    link.download = `whiteboard-${year}-${month}-${day}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    socket.on("draw", (data: LineType) => {
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

    socket.on("clear", () => {
      setLines([]);
      linesRef.current = [];
    });
  }, []);

  useEffect(() => {
    if (tool === "pen") WBContainerRef.current.style.cursor = `url(${PencilCursor}) 4 27,auto`;
    if (tool === "erase") WBContainerRef.current.style.cursor = `url(${EraserCursor}) 4 27,auto`;
    if (capture === true) {
      const dataURL = layerRef.current.getStage().toDataURL({ pixelRatio: 3 });
      downloadURI(dataURL);
      WBDispatch({ type: "capture", capture: false });
    }
  }, [tool, capture]);

  return (
    <div ref={WBContainerRef}>
      <WhiteboardToolbar />
      <Stage
        style={{ border: "1px red solid" }}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer ref={layerRef}>
          {lines.map((line: LineType, idx: number) => (
            <Line
              key={idx}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={line.tool === "erase" ? "destination-out" : "source-over"}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Whiteboard;
