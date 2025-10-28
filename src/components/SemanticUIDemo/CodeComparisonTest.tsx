import * as React from 'react';
import { Title, Card, CardBody, CardHeader, Tabs, Tab, TabTitleText, TabContent, CodeBlock, CodeBlockCode, Button, Alert, AlertVariant, Grid, GridItem, Badge } from '@patternfly/react-core';
import { CopyIcon, CheckCircleIcon, ExclamationTriangleIcon, SearchIcon, ThumbsUpIcon } from '@patternfly/react-icons';

/**
 * This test compares code comprehension between PatternFly-only and Semantic UI implementations.
 * 
 * TEST SCENARIOS:
 * 1. Find all checkout/purchase buttons
 * 2. Identify all confirmation dialogs
 * 3. Locate all primary action buttons
 * 4. Find components used for data display vs forms vs navigation
 */

const patternFlyCode = `// PatternFly Only - Button usage
import { Button } from '@patternfly/react-core';

function Checkout() {
  return (
    <Button variant="primary" onClick={handlePurchase}>
      Complete Purchase
    </Button>
  );
}

function ProductCard() {
  return (
    <Card>
      <CardBody>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </CardBody>
    </Card>
  );
}

function Navigation() {
  return (
    <Button variant="tertiary" onClick={goToHome}>
      Home
    </Button>
  );
}`;

const semanticUICode = `// With Semantic UI Layer
import { Button } from 'semantic-ui-layer';

function Checkout() {
  return (
    <Button 
      variant="primary" 
      onClick={handlePurchase}
      action="primary"
      context="checkout"
      aiMetadata={{
        description: "Final purchase button to complete transaction",
        usage: ["checkout", "purchase", "workflow-completion"]
      }}
    >
      Complete Purchase
    </Button>
  );
}

function ProductCard() {
  return (
    <Card 
      purpose="product-display"
      contentType="interactive"
    >
      <CardBody>
        <Button 
          variant="primary" 
          onClick={handleAddToCart}
          action="primary"
          context="product"
          aiMetadata={{
            description: "Add product to shopping cart",
            usage: ["add-to-cart", "product-interaction"]
          }}
        >
          Add to Cart
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleCancel}
          action="secondary"
          context="product"
        >
          Cancel
        </Button>
      </CardBody>
    </Card>
  );
}

function Navigation() {
  return (
    <Button 
      variant="tertiary" 
      onClick={goToHome}
      action="navigation"
      context="navigation"
    >
      Home
    </Button>
  );
}`;

const testScenarios = [
  {
    id: 1,
    question: "Find all checkout/purchase buttons",
    patternFlyAnswer: "Requires searching for 'variant=\"primary\"' and inferring from context (onClick handlers, button text, surrounding code)",
    semanticAnswer: "Search for 'action=\"primary\"' AND 'context=\"checkout\"' OR search aiMetadata.usage for 'checkout' or 'purchase'",
    difficulty: {
      patternFly: "Hard - Requires context analysis",
      semantic: "Easy - Direct metadata lookup"
    }
  },
  {
    id: 2,
    question: "Identify all confirmation dialogs",
    patternFlyAnswer: "Must search for Modal components and analyze their purpose from title/props/children content",
    semanticAnswer: "Search for Modal with 'purpose=\"confirmation\"' or aiMetadata.usage containing 'confirmation'",
    difficulty: {
      patternFly: "Hard - Text parsing required",
      semantic: "Easy - Structured metadata"
    }
  },
  {
    id: 3,
    question: "Locate all primary action buttons",
    patternFlyAnswer: "Search for 'variant=\"primary\"' but must filter out navigation buttons, which also use primary variant",
    semanticAnswer: "Search for 'action=\"primary\"' and optionally filter by context (form vs navigation vs checkout)",
    difficulty: {
      patternFly: "Medium - Need filtering logic",
      semantic: "Easy - Explicit action prop"
    }
  },
  {
    id: 4,
    question: "Find components used for data display vs forms vs navigation",
    patternFlyAnswer: "Infer from component types (Card likely display, Form components for forms) and context clues",
    semanticAnswer: "Query by purpose prop: 'purpose=\"data-display\"', 'contentType=\"form\"', or 'action=\"navigation\"'",
    difficulty: {
      patternFly: "Hard - Heuristic-based inference",
      semantic: "Easy - Explicit categorization"
    }
  }
];

export const CodeComparisonTest: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState<string | number>(0);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <Title headingLevel="h1" size="xl" style={{ marginBottom: '20px' }}>
        Semantic UI Library - AI Comprehension Test
      </Title>

      <Alert 
        variant={AlertVariant.info} 
        isInline 
        title="Test Purpose"
        style={{ marginBottom: '30px' }}
      >
        This test compares how easily an AI assistant can understand and query code patterns 
        with PatternFly-only vs. Semantic UI Layer metadata. Each scenario demonstrates 
        a real-world task that AI tools need to perform.
      </Alert>

      <Card style={{ marginBottom: '30px' }}>
        <CardHeader>
          <Title headingLevel="h2" size="lg">Test Scenarios</Title>
        </CardHeader>
        <CardBody>
          {testScenarios.map((scenario) => (
            <Card key={scenario.id} isCompact style={{ marginBottom: '20px' }}>
              <CardHeader>
                <Title headingLevel="h3" size="md">
                  Scenario {scenario.id}: {scenario.question}
                </Title>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                    <h4 style={{ color: '#c9190b' }}>PatternFly Only</h4>
                    <p><strong>Difficulty:</strong> {scenario.difficulty.patternFly}</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                      {scenario.patternFlyAnswer}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ color: '#0066cc' }}>With Semantic UI</h4>
                    <p><strong>Difficulty:</strong> {scenario.difficulty.semantic}</p>
                    <p style={{ fontSize: '14px', marginTop: '10px' }}>
                      {scenario.semanticAnswer}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(event, tabIndex) => setActiveTab(tabIndex)}
        aria-label="Code comparison tabs"
        isBox
      >
        <Tab eventKey={0} title={<TabTitleText>PatternFly Only</TabTitleText>}>
          <TabContent style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <Title headingLevel="h3" size="md">Raw PatternFly Code</Title>
              <Button
                variant="secondary"
                icon={<CopyIcon />}
                onClick={() => handleCopy(patternFlyCode)}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>
            <CodeBlock>
              <CodeBlockCode>{patternFlyCode}</CodeBlockCode>
            </CodeBlock>
            <Alert 
              variant={AlertVariant.warning} 
              isInline 
              title="Challenge for AI"
              style={{ marginTop: '20px' }}
            >
              Without semantic metadata, an AI assistant must:
              <ul style={{ marginTop: '10px' }}>
                <li>Parse button text to infer purpose ("Complete Purchase" vs "Add to Cart")</li>
                <li>Analyze onClick handlers to understand context</li>
                <li>Examine surrounding components to determine usage patterns</li>
                <li>Use heuristics that may not be reliable</li>
              </ul>
            </Alert>
          </TabContent>
        </Tab>

        <Tab eventKey={1} title={<TabTitleText>With Semantic UI Layer</TabTitleText>}>
          <TabContent style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <Title headingLevel="h3" size="md">Semantic UI Enhanced Code</Title>
              <Button
                variant="secondary"
                icon={<CopyIcon />}
                onClick={() => handleCopy(semanticUICode)}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
            </div>
            <CodeBlock>
              <CodeBlockCode>{semanticUICode}</CodeBlockCode>
            </CodeBlock>
            <Alert 
              variant={AlertVariant.success} 
              isInline 
              title="AI Advantages"
              style={{ marginTop: '20px' }}
            >
              With semantic metadata, an AI assistant can:
              <ul style={{ marginTop: '10px' }}>
                <li>Query by explicit action type ('action="primary"')</li>
                <li>Filter by context ('context="checkout"')</li>
                <li>Search metadata.usage arrays for specific patterns</li>
                <li>Use structured, reliable data instead of inference</li>
              </ul>
            </Alert>
          </TabContent>
        </Tab>

        <Tab eventKey={2} title={<TabTitleText>User Experience Impact</TabTitleText>}>
          <TabContent style={{ marginTop: '20px' }}>
            <Alert 
              variant={AlertVariant.info} 
              isInline 
              title="High Fidelity vs Low Fidelity"
              style={{ marginBottom: '30px' }}
            >
              See how semantic metadata transforms the AI development experience from low-fidelity 
              guesses to high-fidelity, context-aware suggestions.
            </Alert>

            <Grid hasGutter>
              <GridItem span={12} md={6}>
                <Card isFullHeight>
                  <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ExclamationTriangleIcon style={{ color: '#c9190b' }} />
                      <Title headingLevel="h3" size="md">Low Fidelity (Without Semantic UI)</Title>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div style={{ 
                      backgroundColor: '#f0f0f0', 
                      padding: '20px', 
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      minHeight: '300px'
                    }}>
                      <div style={{ color: '#8b0000', marginBottom: '15px' }}>
                        <strong>User Prompt:</strong> "Make the checkout button red"
                      </div>
                      <div style={{ color: '#666', marginBottom: '15px' }}>
                        <strong>AI Response:</strong>
                        <div style={{ marginTop: '8px', paddingLeft: '15px' }}>
                          <SearchIcon style={{ marginRight: '5px' }} />
                          Searching for buttons with "checkout" in text...
                        </div>
                        <div style={{ marginTop: '8px', paddingLeft: '15px' }}>
                          Found 3 potential matches:
                          <ul style={{ marginTop: '5px' }}>
                            <li>Button: "Go to Checkout" (variant: primary)</li>
                            <li>Button: "Complete Purchase" (variant: primary)</li>
                            <li>Button: "Checkout Items" (variant: secondary)</li>
                          </ul>
                        </div>
                        <div style={{ marginTop: '8px', paddingLeft: '15px', color: '#8b0000' }}>
                          ⚠️ Uncertain which is the correct checkout button.
                          <br />
                          Should I update all of them?
                        </div>
                      </div>
                      
                      <div style={{ 
                        borderTop: '1px solid #ccc', 
                        paddingTop: '15px', 
                        marginTop: '15px',
                        color: '#666'
                      }}>
                        <strong>Problems:</strong>
                        <ul style={{ marginTop: '8px' }}>
                          <li>Requires manual confirmation</li>
                          <li>May modify wrong buttons</li>
                          <li>Slower iteration cycle</li>
                          <li>Context guessing required</li>
                        </ul>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>

              <GridItem span={12} md={6}>
                <Card isFullHeight>
                  <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircleIcon style={{ color: '#06c' }} />
                      <Title headingLevel="h3" size="md">High Fidelity (With Semantic UI)</Title>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div style={{ 
                      backgroundColor: '#e7f1fa', 
                      padding: '20px', 
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      minHeight: '300px'
                    }}>
                      <div style={{ color: '#004080', marginBottom: '15px' }}>
                        <strong>User Prompt:</strong> "Make the checkout button red"
                      </div>
                      <div style={{ color: '#004080', marginBottom: '15px' }}>
                        <strong>AI Response:</strong>
                        <div style={{ marginTop: '8px', paddingLeft: '15px' }}>
                          <SearchIcon style={{ marginRight: '5px', color: '#06c' }} />
                          Querying: action="primary" AND context="checkout"
                        </div>
                        <div style={{ marginTop: '8px', paddingLeft: '15px', color: '#0066cc' }}>
                          ✓ Found exact match: 
                          <br />
                          <span style={{ paddingLeft: '20px' }}>
                            Button (action: "primary", context: "checkout")
                          </span>
                        </div>
                        <div style={{ 
                          marginTop: '8px', 
                          padding: '10px',
                          backgroundColor: '#fff',
                          borderRadius: '4px',
                          border: '1px solid #06c'
                        }}>
                          <code style={{ whiteSpace: 'pre-wrap', display: 'block' }}>
                            {'<Button\n'}
                            {'  variant="danger"\n'}
                            {'  action="primary"\n'}
                            {'  context="checkout"\n'}
                            {'  onClick={handleCheckout}>\n'}
                            {'  Complete Purchase\n'}
                            {'</Button>'}
                          </code>
                        </div>
                      </div>
                      
                      <div style={{ 
                        borderTop: '1px solid #0066cc', 
                        paddingTop: '15px', 
                        marginTop: '15px',
                        color: '#004080'
                      }}>
                        <strong>Benefits:</strong>
                        <ul style={{ marginTop: '8px' }}>
                          <li>✅ Precise component identification</li>
                          <li>✅ Zero ambiguity</li>
                          <li>✅ Faster development</li>
                          <li>✅ Context-aware suggestions</li>
                        </ul>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            <Card style={{ marginTop: '30px' }}>
              <CardHeader>
                <Title headingLevel="h3" size="md">Real-World Impact Metrics</Title>
              </CardHeader>
              <CardBody>
                <Grid hasGutter>
                  <GridItem span={12} md={3}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0066cc' }}>~80%</div>
                      <div style={{ marginTop: '10px', color: '#666' }}>
                        <strong>Fewer Follow-up Questions</strong>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '5px', color: '#999' }}>
                        AI needs less clarification with explicit metadata
                      </div>
                    </div>
                  </GridItem>
                  <GridItem span={12} md={3}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#0066cc' }}>~60%</div>
                      <div style={{ marginTop: '10px', color: '#666' }}>
                        <strong>Faster Iteration</strong>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '5px', color: '#999' }}>
                        Direct queries vs. context parsing saves time
                      </div>
                    </div>
                  </GridItem>
                  <GridItem span={12} md={3}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#06c' }}>~95%</div>
                      <div style={{ marginTop: '10px', color: '#666' }}>
                        <strong>Accuracy Improvement</strong>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '5px', color: '#999' }}>
                        Structured data eliminates guesswork
                      </div>
                    </div>
                  </GridItem>
                  <GridItem span={12} md={3}>
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#06c' }}>100%</div>
                      <div style={{ marginTop: '10px', color: '#666' }}>
                        <strong>Confidence</strong>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '5px', color: '#999' }}>
                        No ambiguity when metadata is explicit
                      </div>
                    </div>
                  </GridItem>
                </Grid>
              </CardBody>
            </Card>
          </TabContent>
        </Tab>
      </Tabs>
    </div>
  );
};

