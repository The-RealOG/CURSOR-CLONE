import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Tree, 
  TreeItem, 
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData
} from '@fluentui/react-components';
import {
  Folder24Regular,
  FolderOpen24Regular,
  Document24Regular,
  Search24Regular,
  SourceControl24Regular,
  Extensions24Regular,
  Settings24Regular,
  ChevronRight16Regular,
  ChevronDown16Regular
} from '@fluentui/react-icons';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  isOpen?: boolean;
}

const mockFileStructure: FileItem[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: 'components',
        name: 'components',
        type: 'folder',
        children: [
          { id: 'App.tsx', name: 'App.tsx', type: 'file' },
          { id: 'Sidebar.tsx', name: 'Sidebar.tsx', type: 'file' },
          { id: 'EditorArea.tsx', name: 'EditorArea.tsx', type: 'file' }
        ]
      },
      { id: 'index.css', name: 'index.css', type: 'file' },
      { id: 'main.tsx', name: 'main.tsx', type: 'file' }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder',
    children: [
      { id: 'vite.svg', name: 'vite.svg', type: 'file' }
    ]
  },
  { id: 'package.json', name: 'package.json', type: 'file' },
  { id: 'tsconfig.json', name: 'tsconfig.json', type: 'file' },
  { id: 'README.md', name: 'README.md', type: 'file' }
];

const Sidebar: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('explorer');
  const [openItems, setOpenItems] = useState<string[]>(['src']);
  const [searchValue, setSearchValue] = useState('');

  const handleTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string);
  };

  const handleTreeOpenChange = (event: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    if (data.open) {
      setOpenItems([...openItems, data.value as string]);
    } else {
      setOpenItems(openItems.filter(item => item !== data.value));
    }
  };

  const renderFileItem = (item: FileItem, level: number = 0): React.ReactNode => {
    const isOpen = openItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <TreeItem
        key={item.id}
        itemType={item.type === 'folder' ? 'branch' : 'leaf'}
        value={item.id}
        style={{ paddingLeft: `${level * 12}px` }}
      >
        <TreeItemLayout
          iconBefore={
            item.type === 'folder' ? (
              isOpen ? <FolderOpen24Regular /> : <Folder24Regular />
            ) : (
              <Document24Regular />
            )
          }
          expandIcon={
            hasChildren ? (
              isOpen ? <ChevronDown16Regular /> : <ChevronRight16Regular />
            ) : undefined
          }
        >
          {item.name}
        </TreeItemLayout>
        {hasChildren && isOpen && (
          <Tree>
            {item.children!.map(child => renderFileItem(child, level + 1))}
          </Tree>
        )}
      </TreeItem>
    );
  };

  const renderExplorerContent = () => (
    <div className="file-explorer">
      <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#888' }}>
        CURSOR-CLONE
      </div>
      <Tree 
        aria-label="File Explorer"
        openItems={openItems}
        onOpenChange={handleTreeOpenChange}
      >
        {mockFileStructure.map(item => renderFileItem(item))}
      </Tree>
    </div>
  );

  const renderSearchContent = () => (
    <div style={{ padding: '12px' }}>
      <Input
        placeholder="Search files..."
        value={searchValue}
        onChange={(e, data) => setSearchValue(data.value)}
        style={{ marginBottom: '12px' }}
      />
      <div style={{ fontSize: '13px', color: '#888' }}>
        Search results will appear here
      </div>
    </div>
  );

  const renderSourceControlContent = () => (
    <div style={{ padding: '12px' }}>
      <div style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '40px' }}>
        No source control providers registered.
      </div>
    </div>
  );

  const renderExtensionsContent = () => (
    <div style={{ padding: '12px' }}>
      <div style={{ fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '40px' }}>
        Manage your extensions
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'explorer':
        return renderExplorerContent();
      case 'search':
        return renderSearchContent();
      case 'source-control':
        return renderSourceControlContent();
      case 'extensions':
        return renderExtensionsContent();
      default:
        return renderExplorerContent();
    }
  };

  return (
    <div className="sidebar">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Activity Bar */}
        <div className="activity-bar">
          <div 
            className={`activity-icon ${selectedTab === 'explorer' ? 'active' : ''}`}
            onClick={() => setSelectedTab('explorer')}
            title="Explorer"
          >
            <Folder24Regular />
          </div>
          <div 
            className={`activity-icon ${selectedTab === 'search' ? 'active' : ''}`}
            onClick={() => setSelectedTab('search')}
            title="Search"
          >
            <Search24Regular />
          </div>
          <div 
            className={`activity-icon ${selectedTab === 'source-control' ? 'active' : ''}`}
            onClick={() => setSelectedTab('source-control')}
            title="Source Control"
          >
            <SourceControl24Regular />
          </div>
          <div 
            className={`activity-icon ${selectedTab === 'extensions' ? 'active' : ''}`}
            onClick={() => setSelectedTab('extensions')}
            title="Extensions"
          >
            <Extensions24Regular />
          </div>
          <div style={{ marginTop: 'auto' }}>
            <div className="activity-icon" title="Settings">
              <Settings24Regular />
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="sidebar-header">
            <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {selectedTab === 'explorer' && 'Explorer'}
              {selectedTab === 'search' && 'Search'}
              {selectedTab === 'source-control' && 'Source Control'}
              {selectedTab === 'extensions' && 'Extensions'}
            </span>
          </div>
          <div className="sidebar-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
