import React from 'react';
import { 
  Button 
} from '@fluentui/react-components';
import {
  CheckmarkCircle24Regular,
  Warning24Regular,
  Error24Regular,
  Branch24Regular,
  CloudSync24Regular,
  LiveOff24Regular
} from '@fluentui/react-icons';

const StatusBar: React.FC = () => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <Button
          appearance="subtle"
          size="small"
          icon={<Branch24Regular />}
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          main
        </Button>
        
        <Button
          appearance="subtle"
          size="small"
          icon={<CloudSync24Regular />}
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          Sync: 0↑ 0↓
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckmarkCircle24Regular style={{ fontSize: '14px' }} />
            <span>0</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Warning24Regular style={{ fontSize: '14px', color: '#ffcc02' }} />
            <span>0</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Error24Regular style={{ fontSize: '14px', color: '#f85149' }} />
            <span>0</span>
          </div>
        </div>
      </div>

      <div className="status-right">
        <Button
          appearance="subtle"
          size="small"
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          Ln 1, Col 1
        </Button>

        <Button
          appearance="subtle"
          size="small"
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          Spaces: 2
        </Button>

        <Button
          appearance="subtle"
          size="small"
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          UTF-8
        </Button>

        <Button
          appearance="subtle"
          size="small"
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          TypeScript
        </Button>

        <Button
          appearance="subtle"
          size="small"
          icon={<LiveOff24Regular />}
          style={{ 
            color: 'white', 
            fontSize: '12px',
            height: '20px',
            minWidth: 'auto',
            padding: '0 4px'
          }}
        >
          Live Share
        </Button>

        <div style={{ 
          backgroundColor: '#16825d', 
          padding: '2px 6px', 
          borderRadius: '2px',
          fontSize: '11px',
          fontWeight: 'bold'
        }}>
          Cursor
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
