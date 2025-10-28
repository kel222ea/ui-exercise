import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page, PageSidebar, PageSection } from '@patternfly/react-core';

import { AppRoutes } from './AppRoutes';
import { AppNavigation } from './AppNavigation';
import '@patternfly/react-core/dist/styles/base.css';

const AppContent: React.FunctionComponent = () => {
  console.log('🔍 AppContent rendered');
  
  return (
    <Page
      sidebar={
        <PageSidebar theme="dark" isSidebarOpen={true}>
          <AppNavigation />
        </PageSidebar>
      }
    >
      <PageSection>
        <AppRoutes />
      </PageSection>
    </Page>
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
