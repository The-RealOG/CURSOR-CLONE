import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@fluentui/react-components';
import { Dismiss24Regular, Add24Regular } from '@fluentui/react-icons';

interface EditorTab {
  id: string;
  name: string;
  content: string;
  language: string;
  isModified: boolean;
}

const EditorArea: React.FC = () => {
  const [tabs, setTabs] = useState<EditorTab[]>([
    {
      id: 'app-tsx',
      name: 'App.tsx',
      language: 'typescript',
      isModified: false,
      content: `import React from 'react';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import EditorArea from './components/EditorArea';
import StatusBar from './components/StatusBar';
import ChatPanel from './components/ChatPanel';

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

export default App;`
    },
    {
      id: 'readme-md',
      name: 'README.md',
      language: 'markdown',
      isModified: true,
      content: `# Cursor AI Clone

This is a frontend clone of Cursor AI, built with React, TypeScript, and Fluent UI.

## Features

- VS Code-like interface
- Monaco Editor integration
- AI Chat panel
- File explorer
- Fluent UI design system

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Built with ❤️ using modern web technologies.`
    }
  ]);

  const [activeTabId, setActiveTabId] = useState('app-tsx');

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!value || !activeTab) return;
    
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, content: value, isModified: true }
          : tab
      )
    );
  };

  const addNewTab = () => {
    const newTabId = `untitled-${Date.now()}`;
    const newTab: EditorTab = {
      id: newTabId,
      name: 'Untitled-1',
      language: 'typescript',
      isModified: false,
      content: '// Start coding...\n'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
  };

  return (
    <div className="editor-area">
      {/* Editor Tabs */}
      <div className="editor-tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`editor-tab ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {tab.name}
              {tab.isModified && (
                <div style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: '#fff' 
                }} />
              )}
            </span>
            <Button
              appearance="subtle"
              size="small"
              icon={<Dismiss24Regular />}
              onClick={(e) => handleTabClose(tab.id, e)}
              style={{ 
                marginLeft: '8px', 
                minWidth: '20px', 
                width: '20px', 
                height: '20px',
                padding: 0
              }}
            />
          </div>
        ))}
        <Button
          appearance="subtle"
          size="small"
          icon={<Add24Regular />}
          onClick={addNewTab}
          style={{ 
            marginLeft: '4px',
            minWidth: '30px',
            width: '30px',
            height: '30px'
          }}
          title="New File"
        />
      </div>

      {/* Editor Content */}
      <div className="editor-content">
        {activeTab ? (
          <Editor
            height="100%"
            language={activeTab.language}
            value={activeTab.content}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: 'Consolas, "Courier New", monospace',
              lineNumbers: 'on',
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: 'smooth',
              renderWhitespace: 'selection',
              bracketPairColorization: { enabled: true },
              guides: {
                bracketPairs: true,
                indentation: true
              },
              suggest: {
                showWords: true,
                showSnippets: true
              },
              quickSuggestions: {
                other: true,
                comments: true,
                strings: true
              }
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#888',
            fontSize: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '12px' }}>Welcome to Cursor Clone</div>
              <Button onClick={addNewTab}>
                Create New File
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorArea;
