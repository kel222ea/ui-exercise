import * as React from 'react';

interface SidebarContextType {
  isSidebarOpen: boolean;
}

export const SidebarContext = React.createContext<SidebarContextType>({
  isSidebarOpen: true
});

