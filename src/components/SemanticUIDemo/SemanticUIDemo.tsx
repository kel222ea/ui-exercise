import * as React from 'react';
import { Tabs, Tab, TabTitleText, TabContent } from '@patternfly/react-core';
import { CardViewBasic } from './CardViewBasic';
import CardViewBasicSemantic from './CardViewBasicSemantic';
import { ComponentWithHTML } from './ComponentWithHTML';

export const SemanticUIDemo: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState<number | string>(0);

  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(_, tabIndex) => setActiveTab(tabIndex)}
      isBox
    >
      <Tab eventKey={0} title={<TabTitleText>Semantic UI Tester</TabTitleText>}>
        <TabContent id="semantic-ui-tester-tab" eventKey={0}>
          <ComponentWithHTML
            component={<CardViewBasic />}
            title="PatternFly Only - Rendered Component"
          />
        </TabContent>
      </Tab>
      <Tab eventKey={1} title={<TabTitleText>Semantic UI Tester Copy</TabTitleText>}>
        <TabContent id="semantic-ui-tester-copy-tab" eventKey={1}>
          <ComponentWithHTML
            component={<CardViewBasicSemantic />}
            title="PatternFly with Semantic UI - Rendered Component"
          />
        </TabContent>
      </Tab>
    </Tabs>
  );
};

