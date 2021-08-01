// external
import { GlobalStyle } from "./globalStyle/GlobalStyle";

// internal
import { WhiteboardProvider } from "./whiteboard/provider/Provider";
import Whiteboard from "./whiteboard/view/Whiteboard";

function App() {
  return (
    <>
      <h1>RealTime - Whiteboard</h1>
      <GlobalStyle />
      <WhiteboardProvider>
        <Whiteboard />
      </WhiteboardProvider>
    </>
  );
}

export default App;
