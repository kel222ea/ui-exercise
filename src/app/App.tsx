import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page, PageSection, Button } from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons';

import { AppRoutes } from './AppRoutes';
import { AppNavigation } from './AppNavigation';
import { SidebarContext } from './SidebarContext';
import '@patternfly/react-core/dist/styles/base.css';

const AppContent: React.FunctionComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  
  const onSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '16px 24px',
        backgroundColor: '#151515',
        borderBottom: '1px solid #3c3f42',
        minHeight: '60px',
        flexShrink: 0
      }}>
        <Button
          variant="plain"
          aria-label="Global navigation"
          onClick={onSidebarToggle}
          style={{ color: 'white', marginRight: '16px' }}
        >
          <BarsIcon />
        </Button>
        <div style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          Demos
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: isSidebarOpen ? '250px' : '0',
            backgroundColor: '#151515',
            overflow: 'hidden',
            transition: 'width 0.3s ease',
            flexShrink: 0
          }}
        >
          {isSidebarOpen && (
            <div style={{ width: '250px', height: '100%' }}>
              <AppNavigation />
            </div>
          )}
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <SidebarContext.Provider value={{ isSidebarOpen }}>
            <Page>
              <PageSection>
                <AppRoutes />
              </PageSection>
            </Page>
          </SidebarContext.Provider>
        </div>
      </div>
    </div>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/ui-exercise' : ''}>
      <AppContent />
    </Router>
  );
};

export default App;
