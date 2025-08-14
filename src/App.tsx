import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import './App.css';

// Components
import Sidebar from '/Users/chibuezekingsleyanyachebelu/sorting/cursor-clone/src/components/EditorArea.tsx';
import EditorArea from '/Users/chibuezekingsleyanyachebelu/sorting/cursor-clone/src/components/EditorArea.tsx';
import StatusBar from '/Users/chibuezekingsleyanyachebelu/sorting/cursor-clone/src/components/StatusBar.tsx';
import ChatPanel from '/Users/chibuezekingsleyanyachebelu/sorting/cursor-clone/src/components/ChatPanel.tsx';

function App() {
  return (
    <FluentProvider theme={webDarkTheme}>
      <div className="app-container">
        <div className="main-content">
          <Sidebar />
          <EditorArea />
          <ChatPanel />
        </div>
        <StatusBar />
      </div>
    </FluentProvider>
  );
}

export default App;