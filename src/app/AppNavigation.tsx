import * as React from 'react';
import { Nav, NavItem, NavList } from '@patternfly/react-core';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppNavigation: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    console.log('🔍 AppNavigation rendered, location:', location.pathname);
  }, [location]);

  const navItems = [
    {
      itemId: 'packages-repositories-demo',
      title: 'Packages and Repositories Demo',
      to: '/packages-and-repositories-demo'
    },
    {
      itemId: 'code-comparison-test',
      title: 'Code Comparison Test',
      to: '/code-comparison-test'
    },
    {
      itemId: 'semantic-ui-demo',
      title: 'Semantic UI Demo',
      to: '/semantic-ui-demo'
    }
  ];

  const onNavSelect = (
    _event: React.FormEvent<HTMLInputElement>,
    selectedItem: {
      itemId: string | number;
    }
  ) => {
    const item = navItems.find(i => i.itemId === selectedItem.itemId);
    if (item) {
      navigate(item.to);
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#151515' }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Navigation</div>
      <Nav onSelect={onNavSelect} theme="dark" aria-label="Global navigation">
        <NavList>
          {navItems.map((item) => {
            const isActive = 
              location.pathname === item.to || 
              (location.pathname === '/' && item.itemId === 'packages-repositories-demo');
            return (
              <NavItem
                key={item.itemId}
                itemId={item.itemId}
                isActive={isActive}
                style={{ color: 'white' }}
              >
                {item.title}
              </NavItem>
            );
          })}
        </NavList>
      </Nav>
    </div>
  );
};